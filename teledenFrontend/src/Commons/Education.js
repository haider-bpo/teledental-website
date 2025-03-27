import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Input, Upload } from "antd";
import moment from "moment";
import React from "react";

const Education = ({ user, setFileList, fileList, form: Form, index }) => {
  return (
    <div>
      <strong>Education</strong>
      <Card style={{ border: "1px solid #E4E4E4" }} className={`mt-2`}>
        <div style={{ gap: "3%" }} className={`d-flex flex-column flex-md-row`}>
          <Form.Item
            name={["education", index, "degree"]}
            label="Degree"
            initialValue={user?.education?.[index]?.degree}
            style={{ flexGrow: 1 }}
            className={`width50ForForItems`}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={["education", index, "yearCompleted"]}
            initialValue={
              user?.education?.[index]?.yearCompleted
                ? moment(user?.education?.[index]?.yearCompleted)
                : undefined
            }
            label="Year Completed"
            style={{ flexGrow: 1 }}
            className={`width50ForForItems`}
          >
            <DatePicker style={{ width: "100%" }} picker="year" />
          </Form.Item>
        </div>
        <div style={{ gap: "3%" }} className={`d-flex flex-column flex-md-row`}>
          <Form.Item
            name={["education", index, "schoolName"]}
            initialValue={user?.education?.[index]?.schoolName}
            label="School Name"
            style={{ flexGrow: 1 }}
            className={`width50ForForItems`}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={["education", index, "schoolLocation"]}
            initialValue={user?.education?.[index]?.schoolLocation}
            label="School Location"
            style={{ flexGrow: 1 }}
            className={`width50ForForItems`}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
        </div>
        <Upload
          fileList={fileList}
          onRemove={() => setFileList([])}
          beforeUpload={(file) => {
            setFileList([file]);
            return false;
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>
            Upload Education Certificate
          </Button>
        </Upload>
      </Card>
    </div>
  );
};

export default Education;
