import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Typography, Form, Card } from "antd";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    span: 24,
  },
};

function CurrentMedications({ user, isLoading, updateHandler }) {
  return (
    <Card className="shadow">
      <div className={"tabProfile"}>
        <Typography.Title level={3}>Current Medications</Typography.Title>

        <Form
          name="dynamic_form_item"
          layout="vertical"
          {...formItemLayoutWithOutLabel}
          onFinish={updateHandler}
          style={{ marginTop: "20px" }}
        >
          <Form.List
            name="currentMedications"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error("At least 1 medication"));
                  }
                },
              },
            ]}
            initialValue={
              user?.currentMedications.length ? user?.currentMedications : [""]
            }
          >
            {(fields, { add, remove }, { errors }) => {
              return (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "Name of Medication" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input medication name.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Medication name" />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "100%" }}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
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
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
}

export default CurrentMedications;
