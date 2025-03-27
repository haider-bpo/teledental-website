import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Typography, Upload } from "antd";

const { Option } = Select;
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
let genderOptions = [
  <Option key="1" value="male">
    Male
  </Option>,
  <Option key="2" value="female">
    Female
  </Option>,
  <Option key="3" value="other">
    Other
  </Option>,
];

function BasicProfile({ user, isLoading, updateHandler, setFile, file }) {
  return (
    <Card className="shadow">
      <div className={"tabProfile"}>
        <Typography.Title level={3}>Manage Profile</Typography.Title>
        <Typography.Text>
          Your profile is the information you’d like to be shown along with your
          name when you Communicate on DentalChat.com
        </Typography.Text>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={updateHandler}
          layout="vertical"
          style={{ marginTop: "20px" }}
        >
          {/* <div
          className={`d-flex flex-column flex-xl-row justify-content-xl-between`}
        >
          <div className={`formItems`}>
            <Form.Item
              label="First Name"
              name="firstName"
              initialValue={user?.firstName}
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className={`formItems`}>
            <Form.Item
              label="Last Name"
              name="lastName"
              initialValue={user?.lastName}
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </div> */}
          <Form.Item
            label="First Name"
            name="firstName"
            initialValue={user?.firstName}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            initialValue={user?.lastName}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            initialValue={user?.email}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="contactNumber"
            initialValue={user?.contactNumber}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item label="Gender" name="gender" initialValue={user?.gender}>
            <Select
              style={{ width: "100%" }}
              placeholder="Select your gender"
              // optionFilterProp="children"
              // filterOption={(input, option) =>
              // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }
            >
              {genderOptions}
            </Select>
          </Form.Item> */}

          <Form.Item label={`Upload your photo.`}>
            <Upload
              onRemove={(file) => {
                setFile((prev) => null);
              }}
              beforeUpload={(file) => {
                setFile((prev) => file);
                return false;
              }}
              file={file}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <div className="float-right">
              <Button
                className="w-150 hover"
                type="primary"
                htmlType="submit"
                loading={isLoading}
                size="large"
                style={{ marginTop: "10px" }}
              >
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
}

export default BasicProfile;
