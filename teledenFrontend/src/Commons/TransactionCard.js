import { Col, Row, Space, Typography, Card } from "antd";
import { useUserContext } from "../Context/userContext";
import { CheckCircleTwoTone } from "@ant-design/icons";

const { Text, Title } = Typography;

export default function TransactionCard({ transaction, date, type }) {
  const { user } = useUserContext();
  return (
    <Card
      style={{ marginBottom: "20px", borderRadius: "10px", maxWidth: "900px" }}
    >
      <Row className={`d-flex `}>
        <Col
          span={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          <CheckCircleTwoTone
            style={{
              fontSize: "30px",
            }}
          />
        </Col>
        <Col span={20}>
          <Row
            style={{ justifyContent: "space-between" }}
            className={`d-flex flex-column`}
          >
            <Col>
              <Row>
                <Space>
                  <Title level={5}>
                    {type === "debit"
                      ? transaction.billing_details.name
                      : user?.firstName + " " + user?.lastName}
                  </Title>
                </Space>
              </Row>
            </Col>

            <Col>
              <Row>
                <Space>
                  <Text strong>Date: </Text>
                  <Text>
                    {`${date.getDate()}-${
                      date.getMonth() + 1
                    }-${date.getFullYear()}`}
                  </Text>
                </Space>
              </Row>
            </Col>
          </Row>
          <Row
            style={{ justifyContent: "space-between" }}
            className={`d-flex flex-column`}
          >
            <Col>
              <Row>
                <Space>
                  <Text strong>
                    Amount {type === "debit" ? "Paid" : "Received"}:{" "}
                  </Text>
                  <Text strong>${transaction.amount / 100}</Text>
                </Space>
              </Row>
            </Col>
            <Col>
              {type === "debit" ? (
                <Space>
                  <Text strong>Payment Method:</Text>
                  <Text>
                    xxxx xxxx xxxx{" "}
                    {transaction.payment_method_details.card.last4}
                  </Text>
                </Space>
              ) : (
                <Space>
                  <Text strong>Fee:</Text>
                  <Text>{transaction.fee / 100}</Text>
                </Space>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
