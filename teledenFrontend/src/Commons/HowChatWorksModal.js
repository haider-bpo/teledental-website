import React from "react";
import { Modal, Tabs } from "antd";
import HowChatWorksCard from "./HowChatWorksCard";
import {
  dentistTabsList,
  dentistFeatures,
  patientTabsList,
  patientFeatures,
} from "../utils/howItWorksData";

const { TabPane } = Tabs;

const HowChatWorksModal = ({ isModalVisible, handleCancel }) => {
  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      width={1000}
      footer={null}
    >
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Dentist" key="1">
          <HowChatWorksCard
            data={dentistTabsList}
            featuresData={dentistFeatures}
          />
        </TabPane>
        <TabPane tab="Patient" key="2">
          <HowChatWorksCard
            data={patientTabsList}
            featuresData={patientFeatures}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default HowChatWorksModal;
