import React, { useState } from "react";
import { Row, Col, Alert } from "antd";
import { Menu } from "antd";
import Profile from "./Profile";
import { useUserContext } from "../Context/userContext";
import AccountForm from "./AccountForm";
import VerificationForm from "./VerificationForm";
import TransactionsList from "../Commons/TransactionsList";
import Header from "../Commons/Header";

const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { paymentInfo } = useUserContext();
  return (
    <Col>
      {!paymentInfo?.accountId && (
        <Alert
          message="Warning"
          description="Fill out your account information so that you can start receiving request from your customer."
          type="warning"
          showIcon
        />
      )}
      <Row className="d-flex flex-column flex-lg-row">
        {/* <Row className="d-flex flex-column"> */}
        {/* <Col className="profile"> */}
        <Col lg={3} className="profile">
          <Header />
          <Menu style={{marginTop: "99px"}}
            defaultSelectedKeys={["profile"]}
            className={`d-flex flex-lg-column`}
            // className={`d-flex `}
          >
            <Menu.Item
              key="profile"
              onClick={() => setActiveStep(1)}
              style={{
                minWidth: `132px`,
              }}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              key="paymentDetails"
              onClick={() => setActiveStep(2)}
              style={{
                minWidth: `132px`,
              }}
            >
              Payment Details
            </Menu.Item>
          </Menu>
        </Col>
        {/* <Col lg={18} xs={24}> */}
        <Col lg={21} xs={24}>
          {activeStep === 1 && <Profile />}
          {activeStep === 2 &&
            (!paymentInfo?.accountId ? (
              <AccountForm />
            ) : paymentInfo?.chargesEnabled ? (
              <TransactionsList type="credit" />
            ) : (
              <VerificationForm />
            ))}
        </Col>
      </Row>
    </Col>
  );
};

export default Dashboard;
