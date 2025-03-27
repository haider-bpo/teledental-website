import React from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
  Typography,
  Row,
  Divider,
} from "antd";
import { signup } from "./apis/authV1";
// import { useUserContext } from "../Context/userContext";
import { FacebookFilled } from "@ant-design/icons";
import GoogleIcon from "../assets/svg/GoogleIcon";
import { PlacesAutocompleteWrapper } from "../Commons/PlacesAutoCompleteWrapper";

function DentistSignUpModal({
  isModalVisible,
  setIsModalVisible,
  // setIsVerificationModalVisible,
  setEntity,
  setIsSignUpSuccessModalVisible,
}) {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const { setToken } = useUserContext();
  const [address, setAddress] = React.useState({});

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const body = {
        ...values,
        location: address,
      };
      const res = await signup({ entity: "dentists", body });
      if (res) {
        setError("");
        setLoading(false);
        setEntity("dentists");
        closeModal();
        setIsSignUpSuccessModalVisible(true);
      }
      // setIsModalVisible("");
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
      title="Dentist Sign Up"
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
          label="Business Name"
          name="businessName"
          rules={[
            { required: true, message: "Please input your business name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Office Address"
          rules={[
            {
              required: true,
              message: "Please select your office address!",
              validator: async (rule, value) => {
                if (!address?.address || !address.coordinates.length) {
                  throw new Error(rule.message);
                }
              },
            },
          ]}
        >
          <PlacesAutocompleteWrapper
            address={address.address}
            setAddress={setAddress}
          />
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
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        {/* <Form.Item label="Contact Person" name="contactPersonName">
          <Input />
        </Form.Item> */}

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
            size="large"
            loading={loading}
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
          href={`${process.env.REACT_APP_API_BASE_URL}/api/v1/dentists/auth/google`}
          style={{ marginTop: "30px" }}
        >
          Continue with Google
        </Button>
        <Button
          className="shadow-sm hover"
          block
          size="large"
          icon={<FacebookFilled />}
          href={`${process.env.REACT_APP_API_BASE_URL}/api/v1/dentists/auth/facebook`}
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

export default DentistSignUpModal;
