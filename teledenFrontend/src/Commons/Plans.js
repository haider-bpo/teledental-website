import {
  Button,
  Card,
  Col,
  message,
  Radio,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import * as React from "react";
import { useMutation, useQuery } from "react-query";
import { useUserContext } from "../Context/userContext";
import { getPlans, requestConsultation } from "../Patient/apis/patientV1";
import PaymentForm from "./PaymentForm";

function Plans({ acitveChatId, closeModal }) {
  const { paymentInfo } = useUserContext();
  const { data, isLoading } = useQuery(
    "plans",
    async () => {
      const res = await getPlans();
      return res.data;
    },
    {
      cacheTime: 0,
    }
  );

  const {
    mutateAsync: requestConsultationFn,
    isLoading: requestConsultationIsLoading,
  } = useMutation(requestConsultation);

  const [selectedPlan, setSelectedPlan] = React.useState(null);
  async function continueButtonHandler() {
    if (selectedPlan) {
      try {
        await requestConsultationFn({
          body: {
            productId: selectedPlan,
            requestId: acitveChatId,
          },
        });
        message.success("Consultation request has been sent to the dentist");
      } catch (error) {
        message.error(error.errMsg);
      }
      closeModal();
    }
  }

  function onRadioChange(e) {
    setSelectedPlan(e.target.value);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          padding: "80px 30px 70px",
          maxWidth: "1000px",
          minHeight: "515px",
        }}
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        <Typography.Title level={2}>
          Select one of the given option
        </Typography.Title>
        {isLoading ? (
          <Spin style={{ margin: "0 auto", color: "#FFF", zIndex: 1 }} />
        ) : (
          <Col>
            <Row style={{ marginBottom: "20px" }}>
              <Radio.Group
                size="large"
                onChange={onRadioChange}
                value={selectedPlan}
                className="plans-radio"
              >
                <Space direction="vertical">
                  {data.map((item) => (
                    <Radio value={item._id}>
                      <div>
                        <span>Item: {item.description}</span>
                        <span>
                          {item.amount / 100} {item.currency.toUpperCase()}
                        </span>
                      </div>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Row>
            {!paymentInfo?.card?.last4 && (
              <PaymentForm
                confirmHandler={continueButtonHandler}
                refetchOnCompletion={false}
                disableButton={!Boolean(selectedPlan)}
                activeChatId={acitveChatId}
              />
            )}
            <Row>
              {paymentInfo?.card?.last4 && (
                <Button
                  className="confirm-btn"
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%", marginTop: "20px" }}
                  loading={isLoading}
                  onClick={continueButtonHandler}
                  disabled={!Boolean(selectedPlan)}
                >
                  CONFIRM-PLAN
                </Button>
              )}
            </Row>
          </Col>
        )}
      </form>
    </div>
  );
}

export default Plans;
