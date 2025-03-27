import { Card, Form, Input, Select, Upload, Button, DatePicker, Modal, Checkbox, Progress, Spin, Radio, Typography, message, } from "antd";
import React, { useState, useEffect } from "react";
import generateToken from "../utils/generateToken";
import { useUserContext } from "../Context/userContext";
import { addSubscription, updateSubscription } from "./apis/commonV1";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import Dragger from "antd/lib/upload/Dragger";
import { CameraOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "@mui/material";
import Moment from 'moment';
import TimezoneSelect, { useTimezoneSelect } from 'react-timezone-select'
import jwt from "jsonwebtoken";

const MySwal = withReactContent(Swal);

export default function Subscription({
  isModalVisible,
  setIsModalVisible,
  isTrialGet
}) {
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const publishableKey =
    'pk_test_51KAs34JBPfp3exDP5KZ00E3s265wlWQ2O3pKoxEWxuOhzpsfVTqZ3qPMgtLweUqwbmabFS1xrTboUY6MxEAMsBOG00pmyBOyR8';
  const priceForStripe = 25000;
  const priceForStripeYearly = 50000;
  const { user, status } = useUserContext();
  const [popupWidth, setpopupWidth] = useState('1200px');


  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };
  const payNowMonthly = async token => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_BASE_URL}/api/v1/public/payment`,
        method: 'post',
        data: {
          amount: 250,
          token,
        },
      });
      if (response.status === 200) {
        saveSubscription('monthly');
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };
  const payNowYearly = async token => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_BASE_URL}/api/v1/public/payment`,
        method: 'post',
        data: {
          amount: 500,
          token,
        },
      });
      if (response.status === 200) {
        saveSubscription('yearly');
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  async function saveSubscription(type) {
    try {
      let datelocal = new Date().getTime().toString();
      let date = new Date();
      let startDate = new Date();
      let endDate = new Date(type == "yearly" ? date.setMonth(date.getMonth() + 12) : 
                             type == "monthly" ? date.setMonth(date.getMonth() + 1) : 
                             date.setDate(date.getDate() + 7));
      let subscription = {
        patientId: user?.model == "patients" ? user?._id: ""
        , dentistId: user?.model == "dentists" ? user?._id: ""
        , name: user?.firstName + " " + user?.lastName
        , email: user?.email
        , active: true
        , startDate: startDate
        , endDate: endDate
        , type: type == "free" ? "Free": type == "monthly" ? "Monthly" : "Yearly"
        , price: type == "free" ? "0.00": type == "monthly" ? "100.00" : "1000.00"
        , createdDate: date
        , subscriptionId: datelocal
      }

      await addSubscription(subscription);
      closeModal();
    } catch (e) {
      console.log("error response", e.response);
    }
  }


  useEffect(() => {
  }, []);



  return (
    <Modal
      // title="Sign In"
      maskClosable={false}
      visible={isModalVisible}
      footer={null}
      title={"Subscription"}
      onCancel={closeModal}
      width={popupWidth}
      style={{ top: "50px" }}
      className="modal_cstm_style"
      cancelButtonProps={{ style: { display: 'none' } }}
      closable={false}
    >
      <Card
        style={{
          minHeight: "30vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="heading-text">
            <h1 className="main-heading">
            Choose your plan
            </h1>
            <p>Supercharge Your Practice Growth with Our Dental Ecosystem</p>
            <h6>Exclusive platinum membership for dentists</h6>
        </div>
        <div className="cards">
        <div className="card" >
            <div className="card-body-header">
                <h6>Free</h6>
                <h3>$0.00</h3>
            </div>
            <div className="card-body">
                <div className="directory-listings">Directory listings</div>
                <div className="dental-leads">Get Dental Leads</div>
            </div>
            <div className="purchase" style={{ cursor: 'pointer', pointerEvents: isTrialGet ? "none": ""}} onClick={() => saveSubscription('free')}>Free Plan</div>
            </div>
            <div className="card">
            <div className="card-body-header">
                <h6>Monthly</h6>
                <h3>$250</h3>
            </div>
            <div className="card-body">
                <div className="directory-listings">Directory listings</div>
                <div className="dental-leads">Get Dental Leads</div>
            </div>
            <StripeCheckout
                    stripeKey={publishableKey}
                    label="Monthly"
                    name="Pay With Credit Card"
                    billingAddress
                    shippingAddress
                    amount={priceForStripe}
                    description={`Your subscription charges is $250`}
                    token={payNowMonthly}
                    id="elite"
                    className="signInButton  brix---btn-secondary w-button d-inline-flex justify-content-center align-items-center purchase"
                />
            {/* <div className="purchase" style={{ cursor: 'pointer', pointerEvents: isTrialGet ? "none": ""}}  onClick={() => saveSubscription('monthly')}>Purchase Plan</div> */}
            </div>
            <div className="card"
                id="elite">
            <div className="card-body-header">
                <h6>Annually</h6>
                <h3>$500</h3>
            </div>
            <div className="card-body">
                <div className="directory-listings">Directory listings</div>
                <div className="dental-leads">Get Dental Leads</div>
                <div className="dental-leads">Get Dental Leads</div>
            </div>
            <StripeCheckout
                    stripeKey={publishableKey}
                    label="Yearly"
                    name="Pay With Credit Card"
                    billingAddress
                    shippingAddress
                    amount={priceForStripeYearly}
                    description={`Your subscription charges is $500`}
                    token={payNowYearly}
                    id="elite"
                    className="signInButton  brix---btn-secondary w-button d-inline-flex justify-content-center align-items-center purchase"
                />
            {/* <div className="purchase" style={{ cursor: 'pointer', pointerEvents: isTrialGet ? "none": ""}}>Purchase Plan</div> */}
            </div>
        </div>
        <div className="footer">
            <h6>Qualified Dentists & Professionals: Embrace the Future with Us. Be Part of the Solution.</h6>
            <h6>Contact Us: service@teledental.com</h6>
        </div>
      </Card>
    </Modal>
  );
}