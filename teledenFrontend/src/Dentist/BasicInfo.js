import React, { useState } from "react";
import { Card, Form, Input, Select, Upload, Button, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

const BasicInfo = ({
  user,
  isLoading,
  updateHandler,
  setFileList,
  fileList,
}) => {
  const { Option } = Select;

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <Card style={{ border: "1px solid #E4E4E4" }}>
      <Form
        layout="vertical"
        onFinish={(body) => updateHandler(body, "profilePhoto")}
      >
        <div
          style={{ gap: "3%" }}
          className="d-flex justify-content-center flex-column flex-md-row"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            initialValue={user?.firstName}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            style={{ flexGrow: 1 }}
            className={`width50ForForItems`}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            initialValue={user?.lastName}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            style={{ flexGrow: 1 }}
            className={`width50ForForItems`}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
        </div>
        <Form.Item
          label="Date of Birth (optional)"
          name="dob"
          style={{ flexGrow: 1 }}
          initialValue={user?.dob ? moment(user?.dob) : undefined}
        >
          <DatePicker onChange={onChange} style={{ width: "100%" }} />
        </Form.Item>
        <div
          style={{ gap: "5%" }}
          className="d-flex justify-content-center flex-column flex-md-row"
        >
          <Form.Item
            label="Gender"
            name="gender"
            initialValue={user?.gender}
            style={{ flexGrow: 1 }}
            className={`width50ForForItems`}
          >
            <Select placeholder="Please select gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            initialValue={user?.email}
            style={{ flexGrow: 1 }}
            className={`width50ForForItems`}
          >
            <Input disabled />
          </Form.Item>
        </div>

        <div
          style={{ display: "flex", gap: "5%" }}
          className="d-flex justify-content-center flex-column flex-md-row"
        >
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            // style={{ width: "50%" }}
          >
            <span style={{ display: "flex", gap: "2%" }}>
              <Select placeholder="USA (+1)" style={{ width: "100px" }}>
                <Option value="male">Pak(+92)</Option>
                <Option value="female">USA (+1)</Option>
              </Select>
              <Input
                type="number"
                placeholder="input placeholder"
                style={{ flexGrow: 1 }}
                className={`width50ForForItems`}
                className="w-100"
              />
            </span>
          </Form.Item>
          <Form.Item
            label="Contact Name"
            name="contactName"
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
          <Button icon={<UploadOutlined />}>Upload Photo</Button>
        </Upload>
        <Form.Item>
          <div className="float-right">
            <Button
              className="w-150 hover"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              style={{ marginTop: "15px" }}
            >
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BasicInfo;
