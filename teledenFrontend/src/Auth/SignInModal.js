// import { FacebookFilled } from "@ant-design/icons";
import { Alert, Button, Form, Input, message, Modal, Tabs } from "antd";
import React from "react";
import { useHistory } from "react-router";
// import GoogleIcon from "../assets/svg/GoogleIcon";
import { useUserContext } from "../Context/userContext";
import { login } from "./apis/authV1";
import { useLocation } from "react-router-dom";
const { TabPane } = Tabs;

function SignInModal({
  isModalVisible,
  setIsModalVisible,
  // setIsVerificationModalVisible,
  setEntity,
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [activeKey, setActiveKey] = React.useState("1");
  const { setToken } = useUserContext();
  const history = useHistory();
  const location = useLocation();

  const onFinish = async (values) => {
    let computedEntity = activeKey === "1" ? "patients" : "dentists";
    try {
      setLoading(true);
      const res = await login({
        entity: computedEntity,
        body: values,
      });
      setToken(res?.data?.token);
      setError("");
      message.success(res.message);
      closeModal();
      window.localStorage.setItem("token", res?.data?.token);
      if (computedEntity === "dentists") {
        if (res.data.chargesEnabled) {
          history.push(`/${computedEntity}/profile`);
        } else {
          history.push(`/${computedEntity}/identity-verification`);
        }
      } else {
        history.push(`/${computedEntity}/dashboard`);
      }
    } catch (error) {
      setLoading(false);
      if (error.errMsg?.toLowerCase() === "email not verified") {
        setEntity(computedEntity);
        setIsModalVisible("");
        // setIsVerificationModalVisible(true);
      } else {
        setError(error.errMsg);
      }
    }
  };

  const forgotPass = () => {
    let computedEntity = activeKey === "1" ? "patient" : "dentist";
    if (location.pathname.includes("/forgot-password")) {
      closeModal();
    }
    history.push(`/${computedEntity}/forgot-password`);
  };

  const closeModal = () => {
    setIsModalVisible("");
    setError("");
  };

  const form = (
    <div className="signup-page-wrapper pb-0">
      {error && (
        <Alert
          style={{ marginBottom: "20px" }}
          message={error}
          type="error"
          showIcon
        />
      )}
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Invalid Email format!",
            },
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <span
          className="d-inline-block forgotPassText"
          onClick={() => forgotPass()}
        >
          Forgot Password?
        </span>
        <Form.Item>
          <br></br>
          <Button
            className="brix---btn-secondary w-button d-inline-flex align-items-center justify-content-center"
            block
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            Sign In
          </Button>
        </Form.Item>

        {/* <Row style={{ display: "flex" }}>
          <Divider style={{ minWidth: "45%", width: "45%" }} />
          <Typography.Title
            style={{ lineHeight: "2.9", margin: "0 10px" }}
            level={5}
          >
            OR
          </Typography.Title>
          <Divider style={{ minWidth: "45%", width: "45%" }} />
        </Row>
        <Button
          className="shadow-sm hover"
          block
          size="large"
          icon={<GoogleIcon />}
          href={`${process.env.REACT_APP_API_BASE_URL}/api/v1/${
            activeKey === "1" ? "patients" : "dentists"
          }/auth/google`}
          style={{ marginTop: "30px" }}
        >
          Continue with Google
        </Button>
        <Button
          className="shadow-sm hover"
          block
          size="large"
          icon={<FacebookFilled />}
          href={`${process.env.REACT_APP_API_BASE_URL}/api/v1/${
            activeKey === "1" ? "patients" : "dentists"
          }/auth/facebook`}
          style={{
            marginTop: "30px",
            backgroundColor: "#3f51b5",
            color: "#FFF",
          }}
        >
          Continue with Facebook
        </Button> */}
      </Form>
    </div>
  );

  return (
    <Modal
      // title="Sign In"
      maskClosable={false}
      visible={isModalVisible}
      footer={null}
      title={null}
      onCancel={closeModal}
    >
      <Tabs
        centered
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        size={"middle"}
        tabBarGutter={50}
      >
        <TabPane tab={<b>Patient Sign In</b>} key="1">
          {form}
        </TabPane>
        <TabPane tab={<b>Dentist Sign In</b>} key="2">
          {form}
        </TabPane>
      </Tabs>
    </Modal>
  );
}

export default SignInModal;
