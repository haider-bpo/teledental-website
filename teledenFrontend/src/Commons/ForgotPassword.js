import React, { useEffect, useState } from "react";
import Header from "./Header";
import Swal from "sweetalert2";
import { Form, Input, Button, Alert } from "antd";
import { forgotPassword } from "../Auth/apis/authV1";
import { useParams, useHistory } from "react-router-dom";

const ForgetPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const { userType } = useParams();
  useEffect(() => {
    if (userType !== "patient" && userType !== "dentist") {
      history.push("/");
    }
  }, [userType]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const body = {
        ...values,
      };
      const res = await forgotPassword({ body, entity: `${userType}s` });
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Email has been sent to your email",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      setError("");
      setLoading(false);
      form.resetFields();
    } catch (error) {
      setLoading(false);
      setError(error.errMsg);
    }
  };
  return (
    <>
      <Header />
      <div className="cosmetic-pd-wrapper footer-center-pages">
        <h2 className="text-center">Forgot Password</h2>
        <div className="forgotPasswordWrapper p-4">
          {error && (
            <Alert
              style={{ marginBottom: "20px" }}
              message={error}
              type="error"
              showIcon
            />
          )}
          <Form
            form={form}
            className="ant-form ant-form-vertical signup-page-wrapper pb-0"
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
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="text-center w-100">
              <Button
                className="w-auto signInButton brix---btn-secondary w-button d-inline-flex justify-content-center align-items-center"
                block
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
