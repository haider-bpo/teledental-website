import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { message, Progress, Spin, Upload } from "antd";
import { uploadFile } from "./apis/dentistV1";
import { useMutation } from "react-query";
import convertFormDataIntoJson from "../utils/convertFormDataIntoJson";
const { Dragger } = Upload;

export default function VerificationUpload({
  setPayload,
  payload,
  purpose,
  type,
  objectKey,
}) {
  const {
    mutateAsync: uploadFileMutation,
    isLoading: uploadFileIsLoading,
    variables: uploadFileVariables,
  } = useMutation(async (formData) => {
    try {
      const res = await uploadFile(formData);
      var object = {};
      formData.body.forEach(function (value, key) {
        object[key] = value;
      });
      setPayload((prev) => ({
        ...prev,
        [objectKey]: { ...prev[objectKey], [object.type]: res.data.id },
      }));
      return res.data;
    } catch (error) {
      message.error(error.errMsg);
    }
  });

  const isUploaded = uploadFileVariables?.body
    ? convertFormDataIntoJson(uploadFileVariables?.body).type === type &&
      convertFormDataIntoJson(uploadFileVariables?.body).purpose === purpose
    : false;

  return (
    <Dragger
      name="file"
      multiple={false}
      action={(file) => {
        const formData = new FormData();
        formData.append("image", file, file.name);
        formData.append("purpose", purpose);
        formData.append("type", type);
        formData.append("key", objectKey);
        return uploadFileMutation({
          body: formData,
        });
      }}
      showUploadList={false}
      disabled={isUploaded}
      accept="image/png,image/jpg,image/jpeg"
    >
      {!payload[objectKey][type] ? (
        uploadFileIsLoading && isUploaded ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <CameraOutlined />
            </p>
            <p className="ant-upload-text">{`Upload ${type} page`}</p>
          </>
        )
      ) : (
        <p className="ant-upload-drag-icon">
          <Progress
            type="circle"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={100}
          />
        </p>
      )}
    </Dragger>
  );
}
