import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, message, Spin, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../Context/userContext";
import { setupIntent, videoConsult } from "../Patient/apis/patientV1";
import { useHistory } from 'react-router-dom';
import AgoraToken from "../Commons/AgoraMeeting/AgoraToken";


const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const PaymentForm = ({
  confirmHandler,
  refetchOnCompletion = true,
  disableButton = false,
  activeChatId
}) => {
  const [paymentMethodAdded, setPaymentMethodAdded] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);
  const { refetchPaymentInfo, user } = useUserContext();
  const history = useHistory();
  const [VideoTitleVal, setVideoTitleVal] = useState('Video Consultancy');
  const [showVideoModal, setVideoModal] = useState(false);
  const [roomName, setroomName] = useState('');
  const [roomNameAgora, setroomNameAgora] = useState('');

  const handleRoomNameChange = () => {
    setroomNameAgora(roomName);
  };

  const closeVideoModal = () => {
    setVideoModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setVideoModal(true);
      var setupIntentRes = await videoConsult(activeChatId);
    } catch (err) {
      message.error(err.errMsg);
      setIsLoading(false);
    }

    // if (!stripe || !elements) {
    //   // Stripe.js has not yet loaded.
    //   // Make sure to disable form submission until Stripe.js has loaded.
    //  return;
    // }
    // setIsLoading(true);
    // try {
    //   var setupIntentRes = await setupIntent();
    // } catch (err) {
    //   message.error(err.errMsg);
    //   setIsLoading(false);
    // }
    // if (!setupIntentRes) {
    //   return;
    // }
    // const result = await stripe.confirmCardSetup(
    //   setupIntentRes.data.client_secret,
    //   {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //       billing_details: {
    //         name: user?.firstName + " " + user?.lastName,
    //       },
    //     },
    //   }
    // );

    // setIsLoading(false);
    // if (result.error) {
    //   // Show error to your customer
    //   message.error(result.error.message);
    // } else {
    //   setPaymentMethodAdded(true);
    //   message.success("Your payment method has been set up successfully");
    //   confirmHandler();
    // }
    confirmHandler();
  };

  React.useEffect(() => {
    if (paymentMethodAdded && refetchOnCompletion) {
      var interval = setInterval(() => {
        refetchPaymentInfo();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paymentMethodAdded]);

  return (
    <>
      <Modal title={VideoTitleVal} style={{ top: "5px" }}
        width={'100%'}
        minHeight={'70vh'}
        visible={showVideoModal}
        onCancel={closeVideoModal}
        footer={null}
      >
        <div className="row">
          <div className="col-lg-3 mb-1">
            <div className="d-flex">
              <div className="pt-1"><Input placeholder="Input Dentist Room Name to Join" value={roomName}
                onChange={event => setroomName(event.target.value)} /></div>
              <div className="px-2">
                {roomNameAgora && (<Button
                  style={{ width: "60px", padding: '10px 60px 10px 60px' }}
                  className="brix---btn-secondary w-button d-inline-flex align-items-center justify-content-center"
                  block
                  type="primary"
                  size="large"
                  onClick={handleRoomNameChange}
                >
                  Join Room
                </Button>)}
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div style={{ textAlign: "center", fontWeight: "bold" }}>
              {roomNameAgora ? <AgoraToken text={roomNameAgora} /> : "Camera Screen"}
            </div>
          </div>
        </div>
      </Modal>
      <Spin spinning={paymentMethodAdded}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ minWidth: "400px" }}>
            {/* <FormControl label="Card details" htmlFor="cardDetails"> */}
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            {/* </FormControl> */}
            <Button
              className="confirm-btn"
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%", marginTop: "20px" }}
              loading={isLoading}
              disabled={disableButton}
              onClick={handleSubmit}
            >
              CONFIRM-Payment
            </Button>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default PaymentForm;
