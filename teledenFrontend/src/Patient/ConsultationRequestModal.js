import { Card, Modal } from "antd";
import * as React from "react";
import Plans from "../Commons/Plans";

export default function ConsultationRequestModal({
  isModalVisible,
  setIsModalVisible,
  acitveChatId,
}) {
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      // title="Sign In"
      maskClosable={false}
      visible={isModalVisible}
      footer={null}
      title={null}
      onCancel={closeModal}
      width={"800px"}
    >
      <Card
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Plans acitveChatId={acitveChatId} closeModal={closeModal} />
      </Card>
    </Modal>
  );
}
