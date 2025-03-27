import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, Upload, Checkbox } from "antd";
import React, { useState } from "react";

const Experience = () => {
  const [fileList, setFileList] = useState([]);

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div>
      <strong>Professional Experience</strong>
      <Card style={{ border: "1px solid #E4E4E4" }} className={`mt-2`}>
        <Form layout="vertical">
          <div
            style={{ gap: "3%" }}
            className={`d-flex flex-column flex-md-row`}
          >
            <Form.Item label="Role/ Job Title" style={{ flexGrow: 1 }}>
              <Input placeholder="Dentist" />
            </Form.Item>
            <Form.Item label="Employer Name" style={{ flexGrow: 1 }}>
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Location" style={{ flexGrow: 1 }}>
              <Input placeholder="input placeholder" />
            </Form.Item>
          </div>

          <div
            style={{ gap: "3%" }}
            className={`d-flex flex-column flex-md-row`}
          >
            <Form.Item label="From" style={{ flexGrow: 1 }}>
              <DatePicker onChange={onChange} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="To" style={{ flexGrow: 1 }}>
              <DatePicker onChange={onChange} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Present" style={{ flexGrow: 1 }}>
              <Checkbox>Yes</Checkbox>
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
            <Button icon={<UploadOutlined />}>Upload Certificate</Button>
          </Upload>
        </Form>
      </Card>
    </div>
  );
};

export default Experience;
