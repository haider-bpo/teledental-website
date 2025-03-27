import { useQuery } from "react-query";
import TransactionCard from "./TransactionCard";
import { Result, Row, Spin } from "antd";
import { getTransactions } from "./apis/commonV1";

export default function TransactionsList({ type = "credit" }) {
  const { data, isLoading } = useQuery(
    ["payment-transactions", type],
    async () => {
      const res = await getTransactions({ type });
      return res.data.data;
    }
  );

  return (
    <>
      {data?.length ? (
        data.map((transaction) => {
          const date = new Date(0);
          date.setSeconds(transaction.created);
          return (
            <TransactionCard
              key={transaction._id}
              type={type}
              transaction={transaction}
              date={date}
            />
          );
        })
      ) : (
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <Spin spinning={true} />
          ) : (
            <Result
              title={`You do not have not any ${
                type === "debit" ? "debit" : "credit"
              } transaction`}
            />
          )}
        </Row>
      )}
    </>
  );
}
