import { FacebookFilled } from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Typography,
} from "antd";
import React from "react";
import GoogleIcon from "../assets/svg/GoogleIcon";
import { useUserContext } from "../Context/userContext";
import { signup } from "./apis/authV1";

function PatientSignUpModal({
  isModalVisible,
  setIsModalVisible,
  // setIsVerificationModalVisible,
  setEntity,
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { setToken } = useUserContext();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await signup({ entity: "patients", body: values });
      setToken(res?.data?.token);
      window.localStorage.setItem("token", res?.data?.token);
      setError("");
      message.success(res.message);
      setEntity("patients");
      setIsModalVisible("");
      // setIsVerificationModalVisible(true);
    } catch (error) {
      setLoading(false);
      setError(error.errMsg);
    }
  };

  const closeModal = () => {
    setIsModalVisible("");
    setError("");
  };

  return (
    <Modal
      maskClosable={false}
      title="Patient Sign Up"
      visible={isModalVisible}
      footer={null}
      onCancel={closeModal}
    >
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
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

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

        <Form.Item
          name="checkbox"
          valuePropName="checked"
          rules={[{ required: true, message: "Please accept terms!" }]}
        >
          <Checkbox>I agree terms of use and privacy policy.</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className="shadow-sm hover"
            block
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            Sign up
          </Button>
        </Form.Item>
        <Row style={{ display: "flex" }}>
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
          href={`${process.env.REACT_APP_API_BASE_URL}/api/v1/patients/auth/google`}
          style={{ marginTop: "30px" }}
        >
          Continue with Google
        </Button>
        <Button
          className="shadow-sm hover"
          block
          size="large"
          icon={<FacebookFilled />}
          href={`${process.env.REACT_APP_API_BASE_URL}/api/v1/patients/auth/facebook`}
          style={{
            marginTop: "30px",
            backgroundColor: "#3f51b5",
            color: "#FFF",
          }}
        >
          Continue with Facebook
        </Button>
      </Form>
    </Modal>
  );
}

export default PatientSignUpModal;
