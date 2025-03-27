import { Card, Form, Input, Select } from "antd";
import React from "react";

const { Option } = Select;
const { TextArea } = Input;

const options = [
  "English",
  "French",
  "Chinese",
  "Italian",
  "Dutch",
  "Hungarian",
  "Japanese",
  "Turkish",
];

const PersonalStatement = () => {
  const children = [];
  for (let i = 0; i < options.length; i++) {
    children.push(<Option key={options[i].toLowerCase()}>{options[i]}</Option>);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div>
      <strong>Describe Your Practice To New Patients</strong>
      <Card style={{ border: "1px solid #E4E4E4" }} className={`mt-2`}>
        <Form layout="vertical">
          <Form.Item label="Languages Spoken">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="--Select Skill--"
              onChange={handleChange}
            >
              {children}
            </Select>
          </Form.Item>
          <Form.Item label="Describe your practice to new patients">
            <TextArea rows={4} placeholder="Personal Statement" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PersonalStatement;
