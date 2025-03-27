import React from "react";
import OfficeHours from "../Commons/OfficeHours";
import BusinessInfo from "../Commons/BusinessInfo";
import { Button, Col, Form, Row } from "antd";

const BusinessDetails = ({
  user,
  isLoading,
  updateHandler,
  setFileList,
  fileList,
}) => {
  async function updateHandlerWrapper(body) {
    const payload = {
      business: {
        ...body,
        officeHours: body.officeHours
          .map((item) => {
            const key = Object.keys(item)[0];
            if (item[key]) {
              return {
                day: key,
                startTime: item[key]?.[0].toDate(),
                endTime: item[key]?.[1].toDate(),
              };
            } else {
              return undefined;
            }
          })
          .filter((item) => item != null),
      },
    };
    updateHandler(payload, "businessPicture");
  }
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={updateHandlerWrapper}
      >
        <Row style={{ width: "100%" }} gutter={16}>
          <Col md={12} xs={24}>
            <OfficeHours user={user} form={Form} />
          </Col>
          <Col md={12} xs={24} className={`marginTopForMobileViewOnly`}>
            <BusinessInfo
              user={user}
              form={Form}
              fileList={fileList}
              setFileList={setFileList}
            />
          </Col>
        </Row>
        <Form.Item>
          <div className="float-right">
            <Button
              className="w-150 hover"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              style={{ marginTop: "10px" }}
            >
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BusinessDetails;
