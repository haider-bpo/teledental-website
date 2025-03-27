import React from "react";
import { Select, Card } from "antd";

const { Option } = Select;

const options = [
  "General Practice",
  "Pediatric Dentistry",
  "Oral and Maxillofacial Surgery",
  "Endodontics",
  "Periodontics",
  "Prosthodontics",
  "Orthodontics and Dentofacial Orthopedics",
  "Oral and Maxillofacial Pathology",
];

const Specialties = () => {
  const children = [];
  for (let i = 0; i < options.length; i++) {
    children.push(<Option key={options[i]}>{options[i]}</Option>);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div>
      <strong>Specialties</strong>
      <Card style={{ border: "1px solid #E4E4E4" }} className={`mt-2`}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="--Select Skill--"
          onChange={handleChange}
        >
          {children}
        </Select>
      </Card>
    </div>
  );
};

export default Specialties;
