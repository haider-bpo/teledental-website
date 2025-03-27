import { UploadOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  message,
  Radio,
  Select,
  Upload,
} from "antd";
import { serialize } from "object-to-formdata";
import * as React from "react";
import { useHistory } from "react-router";
import { PlacesAutocompleteWrapper } from "../Commons/PlacesAutoCompleteWrapper";
import { useUserContext } from "../Context/userContext";
import Header from "../Commons/Header";
import { createRequest } from "./apis/patientV1";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 32 },
};

const { Option } = Select;

function CreateRequest() {
  // dentalCare

  const [address, setAddress] = React.useState({});
  const history = useHistory();
  const [dentalCare, setDentalCare] = React.useState(false);
  const [insuranceInformation, setInsuranceInformation] = React.useState(false);
  const [procedure, setProcedure] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { user, refetch } = useUserContext();

  const [fileList, setFileList] = React.useState([]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const body = {
        ...values,
        dentalCare: { status: dentalCare, content: values.dentalCare },
        insuranceInformation: {
          status: insuranceInformation,
          content: values.insuranceInformation,
        },
        procedure: { status: procedure, content: values.procedure },
      };
      // CANT SEND OBJECTS. FIX IT
      // let formData = new FormData();
      // for (let key in body) {
      //   if (key !== "type") formData.append(key, body[key]);
      // }

      // body.type.forEach((type) => {
      //   formData.append("type", type);
      // });
      const formData = serialize(body);
      fileList.forEach((file) => {
        formData.append("images", file, file.name);
      });

      if (Object.keys(user.location ?? {}).length === 0) {
        for (let item in address) {
          if (Array.isArray(address[item])) {
            for (let i of address[item])
              formData.append(`location[${item}][]`, i);
          } else {
            formData.append(`location[${item}]`, address[item]);
          }
        }
      }

      // setUploading(true);
      await createRequest({ body: formData });
      setLoading(false);
      message.success("Request created successfully");
      refetch();
      history.push("/patients/messages");
    } catch (error) {
      setLoading(false);
      setError(error.errMsg);
    }
  };

  let typeOptions = [
    <Option key="1" value="Find a dentist">
      Find a dentist
    </Option>,
    <Option key="2" value="Ask a dental question">
      Ask a dental question
    </Option>,
    <Option key="3" value="15-min Video consultation">
      15-min Video consultation
    </Option>,
    <Option key="4" value="15-min Video consultation + Electronic prescription">
      15-min Video consultation + Electronic prescription
    </Option>,
  ];

  let painLevelOptions = [
    <Option key="1" value="low">
      Low
    </Option>,
    <Option key="2" value="medium">
      Medium
    </Option>,
    <Option key="3" value="high">
      High
    </Option>,
  ];
  let dentalCareOptions = [
    <Option key="1" value="Dental cleaning / exam">
      Dental cleaning / exam
    </Option>,
    <Option key="2" value="Emergency dental problem">
      Emergency dental problem
    </Option>,
    <Option key="3" value="Dental implant">
      Dental implant
    </Option>,
    <Option key="4" value="Children dental care">
      Children dental care
    </Option>,
    <Option key="5" value="Orthodontics / clear aligners">
      Orthodontics / clear aligners
    </Option>,
    <Option key="6" value="Other">
      Other
    </Option>,
  ];
  let procedureOptions = [
    <Option key="1" value="Teeth Whitening">
      Teeth Whitening
    </Option>,
    <Option key="2" value="Invisalign">
      Invisalign
    </Option>,
    <Option key="3" value="Dental Bridge">
      Dental Bridge
    </Option>,
    <Option key="4" value="Implant(s)">
      Implant(s)
    </Option>,
    <Option key="5" value="Veneers">
      Veneers
    </Option>,
    <Option key="6" value="Crowns (caps)">
      Crowns (caps)
    </Option>,
    <Option key="7" value="Partials">
      Partials
    </Option>,
    <Option key="8" value="All on 4 Implants">
      All on 4 Implants
    </Option>,
  ];

  return (
    <><Header />
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "6%" }}
    >
      <Card
        title={<h5>
          <b>Create Request</b>
        </h5>}
        headStyle={{
          fontSize: "24px !important",
          fontWeight: "bold",
          textAlign: "center",
        }}
        className="form-card-width shadow-sm hover"
        type="inner"
      >
        {error && (
          <Alert
            style={{ marginBottom: "20px" }}
            message={error}
            type="error"
            showIcon />
        )}
        {/* <Typography.Title level={3}>Create Request</Typography.Title> */}
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxwidth: "800px", width: "100%" }}
        >
          <Form.Item
            label="Select all that applies, this request is for:"
            name="type"
            rules={[{ required: true, message: "Please select at least once" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Request type"
            >
              {typeOptions}
            </Select>
          </Form.Item>
          <Form.Item name="isEmergency" label="Do you have a dental emergency?" initialValue={false}>
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={false}>No</Radio.Button>
              <Radio.Button value={true}>Yes</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Pain Level"
            name="painLevel"
            rules={[
              { required: true, message: "Please select your pain level" },
            ]}
          >
            <Select
              // showSearch
              // mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select your pain level"
              optionFilterProp="children"
              // onFocus={onFocus}
              // onBlur={onBlur}
              // onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {painLevelOptions}
            </Select>
          </Form.Item>
          <Form.Item
            label="Briefly explain what is your dental concern."
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Please explain why need a Teledental video consultation? Be to the point, as the Teledental consultation is for 10 minutes or less."
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastCleaning"
            // label="When was the last time you had a professional cleaning at a dental office?"
            label="Last time you had a professional cleaning at a dental office?"
            initialValue="Less than one year"
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="Less than one year">
                Less than one year
              </Radio.Button>
              <Radio.Button value="One year or more">
                One year or more
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="lastVisit"
            label="Last visit to the dentist?"
            // label="When was your last visit to the dentist?"
            initialValue="Less than one year"
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="Less than one year">
                Less than one year
              </Radio.Button>
              <Radio.Button value="One year or more">
                One year or more
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="lastDentalXRay"
            // label="When was the last time you had dental x-rays?"
            label="Last time you had dental x-rays?"
            initialValue="Less than one year"
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="Less than one year">
                Less than one year
              </Radio.Button>
              <Radio.Button value="One year or more">
                One year or more
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Are you looking for a new dentist?">
            <Radio.Group buttonStyle="solid" defaultValue={false}>
              <Radio.Button value={false} onClick={() => setDentalCare(false)}>
                No
              </Radio.Button>
              <Radio.Button value={true} onClick={() => setDentalCare(true)}>
                Yes
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {dentalCare && (
            <Form.Item
              label="What kind of dental care do you need?"
              name="dentalCare"
              rules={[
                {
                  required: dentalCare,
                  message: "Please select at least one value",
                },
              ]}
            >
              <Select
                // showSearch
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select your dental care"
              >
                {dentalCareOptions}
              </Select>
            </Form.Item>
          )}
          <Form.Item label="Do you have dental insurance?">
            <Radio.Group buttonStyle="solid" defaultValue={false}>
              <Radio.Button
                value={false}
                onClick={() => setInsuranceInformation(false)}
              >
                No
              </Radio.Button>
              <Radio.Button
                value={true}
                onClick={() => setInsuranceInformation(true)}
              >
                Yes
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {insuranceInformation && (
            <Form.Item
              label="Insurance Information"
              name="insuranceInformation"
              rules={[
                {
                  required: insuranceInformation,
                  message: "Please input your insurance information!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item label="Are you interested in patient financing?">
            <Radio.Group buttonStyle="solid" defaultValue={false}>
              <Radio.Button value={false} onClick={() => setProcedure(false)}>
                No
              </Radio.Button>
              <Radio.Button value={true} onClick={() => setProcedure(true)}>
                Yes
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {procedure && (
            <Form.Item
              label="Please identify the type of procedure(s) you are seeking (If unsure, please leave blank):"
              name="procedure"
              rules={[
                {
                  required: procedure,
                  message: "Please input your insurance information!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select your procedure"
              >
                {procedureOptions}
              </Select>
            </Form.Item>
          )}
          {Object.keys(user?.location ?? {}).length === 0 ? (
            <Form.Item
              name="location"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please select your address!",
                  validator: async (rule, value) => {
                    if (!address?.address || !address.coordinates.length) {
                      throw new Error(rule.message);
                    }
                  },
                },
              ]}
            >
              <PlacesAutocompleteWrapper
                address={address.address}
                setAddress={setAddress} />
            </Form.Item>
          ) : null}

          <Form.Item label="Attach dental picture(s) or dental x-ray images to help our dentists">
            <Upload
              onRemove={(file) => {
                setFileList((prev) => {
                  const index = fileList.indexOf(file);
                  const newFileList = fileList.slice();
                  newFileList.splice(index, 1);
                  return newFileList;
                });
              } }
              beforeUpload={(file) => {
                setFileList((prev) => [...prev, file]);
                return false;
              } }
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              className="shadow-sm hover"
              block
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{ marginTop: "10px" }}
            >
              Create Post
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div></>
  );
}

export default CreateRequest;
