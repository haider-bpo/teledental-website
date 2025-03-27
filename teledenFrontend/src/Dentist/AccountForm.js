import {
  Card,
  Button,
  Form,
  Input,
  message,
  Select,
  Spin,
  Typography,
} from "antd";
import * as React from "react";
import { CountryRegionData } from "react-country-region-selector";
import { useMutation } from "react-query";
import { useUserContext } from "../Context/userContext";
import { createAccount } from "./apis/dentistV1";

const initialCountriesList = CountryRegionData.map((data) => ({
  label: data[0],
  value: data[1],
}));

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 32 },
};

const AccountForm = () => {
  const [form] = Form.useForm();
  const [regions, setRegions] = React.useState([]);
  const [accountCreated, setAccountCreated] = React.useState(false);
  const { mutateAsync, isLoading } = useMutation(createAccount);
  const { refetchPaymentInfo } = useUserContext();

  async function onFinish(data) {
    try {
      await mutateAsync({ body: data });
      setAccountCreated(true);
    } catch (error) {
      message.error(error.errMsg);
    }
  }

  React.useEffect(() => {
    if (accountCreated) {
      var interval = setInterval(() => {
        refetchPaymentInfo();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [accountCreated]);

  return (
    <Spin spinning={accountCreated}>
      <Card
        className="shadow-sm"
        bodyStyle={{ padding: "16px 10px" }}
        style={{
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography.Title level={3}>
            Information for receiving payment
          </Typography.Title>
          <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: "800px", width: "100%" }}
            form={form}
          >
            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true, message: "Please select at least once" },
              ]}
            >
              <Select
                showSearch
                options={initialCountriesList}
                optionFilterProp="label"
                onChange={() => {
                  const country = form.getFieldValue("country");
                  console.log({ country });
                  setRegions(
                    country
                      ? CountryRegionData.find((data) => data[1] === country)[2]
                          .split("|")
                          .map((state) => ({ label: state, value: state }))
                      : []
                  );
                }}
              />
            </Form.Item>
            <Form.Item
              label="Region"
              name="state"
              rules={[
                { required: true, message: "Please select at least once" },
              ]}
            >
              <Select
                // disabled={form.getFieldValue("country")}
                showSearch
                options={regions}
                optionFilterProp="label"
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="line1"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[
                { required: true, message: "Please input your postalCode!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phoneNumber!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Button
              className="confirm-btn"
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
              loading={isLoading}
            >
              CONTINUE
            </Button>
          </Form>
        </div>
      </Card>
    </Spin>
  );
};

export default AccountForm;
