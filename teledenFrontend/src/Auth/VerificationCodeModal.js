import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Row,
  Typography,
  message,
} from "antd";
import React from "react";
import { useUserContext } from "../Context/userContext";
import { verifyCode } from "./apis/authV1";

const layout = {
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 10 },
};

function VerificationCodeModal({ isModalVisible, setIsModalVisible, entity }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { setToken, user } = useUserContext();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await verifyCode({
        entity,
        userId: user._id,
        body: values,
      });
      setToken(res?.data?.token);
      // window.localStorage.setItem("token", res?.data?.token);
      // setError("");
      message.success(res.message);
      closeModal();
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
      title="Verification Code"
      visible={isModalVisible}
      footer={null}
      onCancel={closeModal}
    >
      <Row style={{ marginBottom: "10px" }}>
        <Typography.Text strong={true}>
          A verification code has been sent to your Email Please enter the code
          to continue
        </Typography.Text>
      </Row>
      {error && (
        <Alert
          style={{ marginBottom: "20px" }}
          message={error}
          type="error"
          showIcon
        />
      )}
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="code"
          rules={[
            { required: true, message: "Enter verification code to continue!" },
          ]}
        >
          <Input maxLength="4" placeholder="Enter code" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default VerificationCodeModal;
