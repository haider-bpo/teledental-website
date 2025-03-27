import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Card, Upload, Button, Input } from "antd";

const BusinessInfo = ({ user, form: Form, fileList, setFileList }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <strong>Business Info</strong>
      <Card style={{ border: "1px solid #E4E4E4" }} className={`mt-2`}>
        <Form.Item
          name="name"
          label="Business Name"
          style={{ flexGrow: 1 }}
          initialValue={user?.business?.name}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Business Address"
          style={{ flexGrow: 1 }}
          initialValue={user?.business?.address}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          name="webAddress"
          label="Web Address"
          style={{ flexGrow: 1 }}
          initialValue={user?.business?.webAddress}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Upload
          style={{ width: "50%" }}
          fileList={fileList}
          onRemove={(file) => {
            setFileList((state) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              return newFileList;
            });
          }}
          beforeUpload={(file) => {
            setFileList((prev) => [...prev, file]);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload Business Pictures</Button>
        </Upload>
      </Card>
    </div>
  );
};

export default BusinessInfo;
