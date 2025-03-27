import { Card, Table, Typography } from "antd";
import PaymentForm from "../Commons/PaymentForm";
import { useUserContext } from "../Context/userContext";

function MyPayments() {
  const { paymentInfo } = useUserContext();

  const columns = [
    {
      title: "Request Id",
      dataIndex: "requstId",
      key: "requestId",
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <Card className="shadow">
      <div
        className={"tabProfile"}
        style={{
          overflowX: "scroll",
        }}
      >
        <Typography.Title level={3}>My Payments</Typography.Title>
        {paymentInfo?.card?.last4 ? (
          <Table
            // loading={isLoading}
            columns={columns}
            dataSource={[]}
            // className={"profileTable"}
            bordered={true}
            pagination={{ size: "small" }}
            style={{
              marginTop: "20px",
              boxShadow: "0 7px 13px 0 rgba(0, 0, 0, 0.06)",
            }}
          />
        ) : (
          <PaymentForm />
        )}
      </div>
    </Card>
  );
}

export default MyPayments;
