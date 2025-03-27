import React from "react";
import { Card, DatePicker } from "antd";
import moment from "moment";

const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const { RangePicker } = DatePicker;

const OfficeHours = ({ user, form: Form }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <strong>Office Hours</strong>
      <Card style={{ border: "1px solid #E4E4E4" }} className={`mt-2 `}>
        {week.map((weekTitle, index) => {
          const officeHour = user?.business?.officeHours?.find(
            (item) => item.day === weekTitle
          );
          return (
            <Form.Item
              name={["officeHours", index, weekTitle]}
              label={weekTitle}
              key={weekTitle}
              initialValue={
                officeHour
                  ? [moment(officeHour?.startTime), moment(officeHour?.endTime)]
                  : undefined
              }
            >
              <RangePicker picker="time" style={{ width: "100%" }} />
            </Form.Item>
          );
        })}
      </Card>
    </div>
  );
};

export default OfficeHours;
