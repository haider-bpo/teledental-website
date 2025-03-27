import React, { useState } from "react";
import Header from "./Header";
import Swal from "sweetalert2";
import { Form, Input, Button, Alert } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { resetPassword } from "../Auth/apis/authV1";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const history = useHistory();
  const search = new URLSearchParams(location.search).get("id");
  const queryParams = search.split("?");
  const typeParam = queryParams[1].split("=");
  const id = queryParams[0];
  const salt = "4";
  const encoded = id;
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  const decodedId = encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
  const type = typeParam[1];

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const body = {
        ...values,
      };
      const res = await resetPassword({
        body,
        type,
        id: decodedId.replaceAll('"', ""),
      });

      if (res) {
        Swal.fire({
          icon: "success",
          title: "Your password has been updated successfully",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      setError("");
      setLoading(false);
      form.resetFields();
      history.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.errMsg);
    }
  };
  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The two passwords do not match."));
    },
  });

  return (
    <>
      <Header />
      <div className="cosmetic-pd-wrapper footer-center-pages">
        <h2 className="text-center">Reset Password</h2>
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
            name="passwordForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password.",
                },
                validateConfirmPassword,
              ]}
              hasFeedback
            >
              <Input.Password />
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

export default ResetPassword;
