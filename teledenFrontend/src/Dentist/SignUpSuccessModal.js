import { Card, Modal, Row, Typography } from "antd";
import emailGif from "../assets/gif/account-email.gif";
import * as React from "react";

export default function SignUpSuccessModal({
  isModalVisible,
  setIsModalVisible,
}) {
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      maskClosable={false}
      visible={isModalVisible}
      footer={null}
      title={null}
      onCancel={closeModal}
      width={"800px"}
    >
      <Card
        style={{
          minHeight: "40vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "40px",
          }}
        >
          <img src={emailGif} alt="loading" />
        </Row>
        <Row>
          <Typography.Title level={4}>
            Check your inbox for the next steps. Your account is not approved
            yet. We will notify you through email once your account gets
            approved
          </Typography.Title>
        </Row>
      </Card>
    </Modal>
  );
}
