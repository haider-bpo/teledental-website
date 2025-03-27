import { Card, Form, Input, Select, Upload, Button, DatePicker, Modal, Checkbox, Progress, Spin, Radio, Typography, message, } from "antd";
import React, { useState, useEffect } from "react";
import generateToken from "../utils/generateToken";
import { useUserContext } from "../Context/userContext";
import { addAppointment, getPatient } from "./apis/patientV1";
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
import AgoraToken from "../Commons/AgoraMeeting/AgoraToken";
import { useHistory } from 'react-router-dom';
import { updateCache } from "../utilities";
import { useQueryClient } from "react-query";

import jwt from "jsonwebtoken";

const MySwal = withReactContent(Swal);

export default function BookAppointment({
  isModalVisible,
  setIsModalVisible,
  acitveChatId,
  activeChat,
  fromDentist,
  setValue,
  sendMessage
}) {
  const closeModal = () => {
    setIsModalVisible(false);
    if (fromDentist) {
      showStepClick("3");
    } else {
      showStepClick("1");
    }
    ResetFields();
  };
  
  const queryClient = useQueryClient();
  const socketRef = React.useRef();

  const { user, status } = useUserContext();
  const [checked, setChecked] = React.useState(true);
  const [checked2, setChecked2] = React.useState(false);
  const [error, setError] = React.useState("hidden");
  const [concern, setConcern] = React.useState('');
  const [swelling, setSwelling] = React.useState('');
  const [pain, setPain] = React.useState('');
  const [hurt, setHurt] = React.useState('');
  const [located, setLocated] = React.useState('');
  const [dateMonth, setDateMonth] = React.useState('');
  const [dateDay, setDateDay] = React.useState('');
  const [dateYear, setDateYear] = React.useState('');
  const [medicalCond, setMedicalCont] = React.useState('');
  const [antibiotic, setAntibiotic] = React.useState(false);
  const [allergic, setAllergic] = React.useState(false);
  const [allergicDesc, setAllergicDes] = React.useState('');
  const [medicalCondBeAware, setmedicalCondBeAware] = React.useState('');
  const [currentMedication, setCurrentMedication] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState(null);
  const [timerange, setTimeRange] = React.useState([null, null]); // Initial selected time range
  const [refundsCheck, setRefundsCheck] = React.useState(false);
  const [termsCheck, setTermsCheck] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState('');
  const [isSubmitPressed, setSubmitPressed] = React.useState(false);

  function ResetFields() {
    setError("hidden");
    setConcern("");
    setSwelling("");
    setPain("");
    setHurt("");
    setLocated("");
    setDateMonth("");
    setDateDay("");
    setDateYear("");
    setMedicalCont("");
    setAntibiotic("");
    setAllergic("");
    setAllergicDes("");
    setmedicalCondBeAware("");
    setCurrentMedication("");
    setTitle("");
    setDate(null);
    setTimeRange([null, null]);
    setRefundsCheck(false);
    setTermsCheck(false);
    setSubmitPressed(false);
  }

  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [selectedTimezoneTemp, setSelectedTimezoneTemp] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  const publishableKey =
    'pk_test_51KAs34JBPfp3exDP5KZ00E3s265wlWQ2O3pKoxEWxuOhzpsfVTqZ3qPMgtLweUqwbmabFS1xrTboUY6MxEAMsBOG00pmyBOyR8';
  const priceForStripe = 500;

  const handleSelectChange = (event) => {
    setSwelling(event);
  };
  const handleHurtSelectChange = (event) => {
    setHurt(event);
  };
  const handleDateMonthSelectChange = (event) => {
    setDateMonth(event);
  };
  const handleDateDaySelectChange = (event) => {
    setDateDay(event);
  };
  const handleDateYearSelectChange = (event) => {
    setDateYear(event);
  };

  const handleAllergicRadioChange = (event) => {
    setAllergic(event.target.value);
  };

  const handleAntibioticRadioChange = (event) => {
    setAntibiotic(event.target.value);
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    setDate(dateStrings);
    SetErrorMessage(dateStrings, timerange, refundsCheck, termsCheck, isSubmitPressed);
    setError("visible");
  };

  function policyChecks(forpolicy, value) {
    if (forpolicy == 'refunds') {
      setRefundsCheck(value);
      SetErrorMessage(date, timerange, value, termsCheck, isSubmitPressed);
    } else {
      setTermsCheck(value);
      SetErrorMessage(date, timerange, refundsCheck, value, isSubmitPressed);
    }
  }

  function SetErrorMessage(date, timerange, refunds, terms, submitPressed) {
    if (submitPressed) {
      let message = 'Please select'
      if (date == null) {
        message = message + ' - date'
      }
      if (timerange[0] == null || timerange[1] == null) {
        message = message + ' - time'
      }
      if (refunds == false) {
        message = message + ' - No Refund consultations policy'
      }
      if (terms == false) {
        message = message + ' - terms and conditions policy'
      }
      if (message == "Please select") {
        message = "";
      }
      seterrorMessage(message);
    }
  }

  const handleTimeRangeChange = (timeValues, timeStrings) => {
    setTimeRange(timeStrings);
    SetErrorMessage(date, timeStrings, refundsCheck, termsCheck, isSubmitPressed);
    setError("visible");
  };

  function toggle(from) {
    setError("hidden");
    if (from == 'check2') {
      setChecked2((state) => !state);
      if (checked) {
        setChecked(false);
      }
    } else if (from == 'check') {
      setChecked((state) => !state);
      if (checked2) {
        setChecked2(false);
      }
    }
  }

  function isAppointmentSelected() {
    setSubmitPressed(true);
    if ((timerange[0] == null || timerange[1] == null || date == null || refundsCheck == false || termsCheck == false)) {
      SetErrorMessage(date, timerange, refundsCheck, termsCheck, true);
      setError("visible");
      return;
    }
  }

  function addMessageInCachedThread(queryKey, queryClient, message) {
    updateCache(queryKey, queryClient, function update(updatedThread) {
      updatedThread.pages[0] = [message, ...updatedThread.pages[0]];
      queryClient.setQueryData(queryKey, updatedThread);
    });
  }
  function updateLastMessage(
    queryKey,
    queryClient,
    { request, message, sender }
  ) {
    updateCache(queryKey, queryClient, function update(updatedRequests) {
      let requestIndex;
      let pageIndex;
      updatedRequests.pages.forEach((i, index) => {
        requestIndex = updatedRequests.pages[index].findIndex(
          (item) => item._id === request
        );
        if (requestIndex > -1) {
          pageIndex = index;
          return true;
        }
        return false;
      });
      if (requestIndex > -1) {
        updatedRequests.pages[pageIndex][requestIndex].lastMessage.message =
          message;
        updatedRequests.pages[pageIndex][requestIndex].lastMessage.sender =
          sender;
        updatedRequests.pages[pageIndex][requestIndex].lastMessage.createdAt =
          new Date();
      }
      queryClient.setQueryData(queryKey, updatedRequests);
    });
  }

  async function saveAppointment() {
    try {
      const token = generateToken({ user, activeChat });
      let pLink = `https://meet.teledental.com/?token=${token}`;
      let datelocal = new Date().getTime().toString();
      let appointment = {
        patientId: user?._id
        , patientName: user?.firstName + " " + user?.lastName
        , patientEmail: user?.email
        , dentistId: activeChat?.assignedTo._id
        // , slotId: checked ? "1" : "2"
        // , slot: checked ? "From 10 AM to 11 AM" : "From 11 AM to 12 PM"
        , patientLink: pLink
        , dentistLink: ""
        , isApproved: false
        , activeChatId: activeChat?.session?._id
        , appointmentId: datelocal
        , dentistName: activeChat?.assignedTo?.firstName + " " + activeChat?.assignedTo?.lastName
        , concern: concern
        , swelling: swelling
        , pain: pain
        , hurt: hurt
        , located: located
        , dateOfLastDentalVisit: dateMonth + " " + dateDay + ", " + dateYear
        , medicalCond: medicalCond
        , antibiotic: antibiotic
        , allergic: allergic
        , allergicDesc: allergicDesc
        , medicalCondBeAware: medicalCondBeAware
        , currentMedication: currentMedication
        , title: title
        , appointmentDate: date
        , slot: timerange[0] + " to " + timerange[1]
        , fromDentist: false
        , timeZone: selectedTimezone?.label == undefined ? selectedTimezoneTemp?.label : selectedTimezone?.label
      }

      await addAppointment(appointment);
      debugger;
      // setValue("your appointment link is: " + pLink);
      // sendMessage();

      const message = {
        // To allow admin to send message on behalf of user
        sender:
          user.model === "dentists" && user.role === "admin"
            ? activeChat?.assignedTo._id
            : user._id,
        receiver:
          user.model === "dentists"
            ? activeChat?.patient._id
            : activeChat?.assignedTo._id,
        request: activeChat._id,
        message: "your appointment link is: " + pLink,
        byAdmin:
          user.model === "dentists" && user.role === "admin" ? true : false,
      };
      socketRef.current.emit("message", message);
      addMessageInCachedThread(["thread", activeChat._id], queryClient, message);
      updateLastMessage("requests", queryClient, message);




      closeModal();
      showStepClick("1");
      ResetFields();
    } catch (e) {
      console.log("error response", e.response);
    }
  }

  async function saveAppointmentFromDentist() {
    setSubmitPressed(true);
    if ((timerange[0] == null || timerange[1] == null || date == null || refundsCheck == false || termsCheck == false)) {
      SetErrorMessage(date, timerange, refundsCheck, termsCheck, true);
      setError("visible");
      return;
    }
    try {
      const token = generateToken({ user, activeChat });
      let dLink = `https://meet.teledental.com/?token=${token}`;
      let result = await getPatient(activeChat?.patient._id);
      let patient = result.data;
      let mdl = "patients";
      const ptoken = generateTokenCustom({ patient, activeChat, mdl });
      let pLink = `https://meet.teledental.com/?token=${ptoken}`;
      let localdate = new Date().getTime().toString();
      let appointment = {
        dentistId: user?._id
        , dentistName: user?.firstName + " " + user?.lastName
        // , slotId: checked? "1" : "2"
        // , slot: checked? "From 10 AM to 11 AM" : "From 11 AM to 12 PM"
        , patientLink: pLink
        , dentistLink: dLink
        , isApproved: true
        , activeChatId: activeChat?.session?._id
        , appointmentId: localdate
        , patientName: activeChat?.patient?.firstName + " " + activeChat?.patient?.lastName
        , patientId: activeChat?.patient._id
        , patientEmail: patient?.email
        , title: title
        , appointmentDate: date
        , slot: timerange[0] + " to " + timerange[1]
        , fromDentist: true
        , timeZone: selectedTimezone?.label == undefined ? selectedTimezoneTemp?.label : selectedTimezone?.label
      }

      await addAppointment(appointment);
      closeModal();
      showStepClick("3");
      ResetFields();
    } catch (e) {
      console.log("error response", e.response);
    }
  }

  function generateTokenCustom({ user, activeChat, modelData }) {
    return jwt.sign(
      {
        model: modelData,
        name: user?.firstName,
        userId: user?._id,
        meetingId: activeChat?.session?._id,
        app_id: 'teledental'
      },
      "-123abcl1;"
    );
  }

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
  const payNow = async token => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_BASE_URL}/api/v1/public/payment`,
        method: 'post',
        data: {
          amount: 100,
          token,
        },
      });
      if (response.status === 200) {
        saveAppointment();
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };


  // new variables by jam 9 aug 2023

  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [titleVal, setTitleVal] = useState('What Is Your Health Concern Today?');
  const [popupWidth, setpopupWidth] = useState('1200px');

  const showStepClick = (val) => {
    if (val == '1') {
      setShowStep1(true);
      setShowStep2(false);
      setShowStep3(false);
      setTitleVal('What Is Your Health Concern Today?');
      setpopupWidth('1200px');
    }
    if (val == '2') {
      setShowStep1(false);
      setShowStep2(true);
      setShowStep3(false);
      setTitleVal('Please verify and update the following information');
      setpopupWidth('1200px');

    }
    if (val == '3') {
      setShowStep1(false);
      setShowStep2(false);
      setShowStep3(true);
      setTitleVal('Select Appointment');
      setpopupWidth('600px');
    }

  };

  const labelStyle = 'original';
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timeZone })

  useEffect(() => {
    if (fromDentist) {
      showStepClick('3');
    } else {
      showStepClick('1');
    }
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let re = parseTimezone(timeZone);
    setSelectedTimezoneTemp(re);
  }, []);

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const { RangePicker } = DatePicker;


  //const isUploaded = true

  // const type = 'back';
  // const uploadFileIsLoading = true
  // const uploadFileMutation = false;
  // const LoadingOutlined = false;
  // const payload = false;
  // const purpose = 'verification';
  // const objectKey = 2

  return (
    <>
      <Modal
        // title="Sign In"
        maskClosable={false}
        visible={isModalVisible}
        footer={null}
        title={titleVal}
        onCancel={closeModal}
        width={popupWidth}
        style={{ top: "50px" }}
        className="modal_cstm_style"
      >
        <Card
          style={{
            minHeight: "30vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          {/* section 1 html */}
          {showStep1 ? (
            <div className="healthConcern_form">
              <Form
                layout="vertical"
              >
                {/*  onFinish={(body) => updateHandler(body, "profilePhoto")} */}

                <Form.Item
                  label="Tell your concern today?"
                  name="concernToday"
                  rules={[
                    { required: true, message: "This field is required!" },
                  ]}
                  className={`width100ForForItems`}
                >
                  <TextArea rows={4} placeholder="" onChange={e => setConcern(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="Is there swelling?"
                  name="swelling"
                  rules={[
                    { required: true, message: "Field is required" },
                  ]}
                >
                  <Select placeholder="" value={swelling} onChange={handleSelectChange}>
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Is you have pain, how long has it hurt? If none enter NA"
                  name="hasitHurt"
                  rules={[
                    { required: true, message: "Field is required!" },
                  ]}

                >
                  <Input placeholder="" onChange={e => setPain(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="How bad does it hurt( 1 being least, 10 being worst)"
                  name="howbaddoesHurt"
                  rules={[
                    { required: true, message: "Field is required" },
                  ]}
                >
                  <Select placeholder="" value={hurt} onChange={handleHurtSelectChange}>
                    <Option value="1">1</Option>
                    <Option value="5">5</Option>
                    <Option value="19">10</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Where are you located at the time of the visit?"
                  name="locatedat"
                  rules={[
                    { required: true, message: "Field is required" },
                  ]}
                >
                  <Input placeholder="" onChange={e => setLocated(e.target.value)} />
                </Form.Item>

                <div class="ant-col ant-form-item-label">
                  <label>Date of the last dental visit? (optional)</label>
                </div>
                <div className="d-flex ba_lastDental_visit">
                  <div className="pe-3 ba_lastDental_visit_month">
                    <Form.Item
                      label=""
                      name="dentalvisitdate"
                    >
                      <Select placeholder="Month" value={dateMonth} onChange={handleDateMonthSelectChange}>
                        <Option value="January">January</Option>
                        <Option value="February">February</Option>
                        <Option value="March">March</Option>
                        <Option value="April">April</Option>
                        <Option value="May">May</Option>
                        <Option value="June">June</Option>
                        <Option value="July">July</Option>
                        <Option value="August">August</Option>
                        <Option value="September">September</Option>
                        <Option value="October">October</Option>
                        <Option value="November">November</Option>
                        <Option value="December">December</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="pe-3 ba_lastDental_visit_day">
                    <Form.Item
                      label=""
                      name="dentalvisitday"
                    >
                      <Select placeholder="Day" value={dateDay} onChange={handleDateDaySelectChange}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                        <Option value="11">11</Option>
                        <Option value="12">12</Option>
                        <Option value="13">13</Option>
                        <Option value="14">14</Option>
                        <Option value="15">15</Option>
                        <Option value="16">16</Option>
                        <Option value="17">17</Option>
                        <Option value="18">18</Option>
                        <Option value="19">19</Option>
                        <Option value="20">20</Option>
                        <Option value="21">21</Option>
                        <Option value="22">22</Option>
                        <Option value="23">23</Option>
                        <Option value="24">24</Option>
                        <Option value="25">25</Option>
                        <Option value="26">26</Option>
                        <Option value="27">27</Option>
                        <Option value="28">28</Option>
                        <Option value="29">29</Option>
                        <Option value="30">30</Option>
                        <Option value="31">31</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="ba_lastDental_visit_year">
                    <Form.Item
                      label=""
                      name="dentalvisityear"
                    >
                      <Select placeholder="Year" value={dateYear} onChange={handleDateYearSelectChange}>
                        <Option value="2023">2023</Option>
                        <Option value="2024">2024</Option>
                        <Option value="2025">2025</Option>
                        <Option value="2026">2026</Option>
                        <Option value="2027">2027</Option>
                        <Option value="2028">2028</Option>
                        <Option value="2029">2029</Option>
                        <Option value="2030">2030</Option>
                        <Option value="2031">2031</Option>
                        <Option value="2032">2032</Option>
                        <Option value="2033">2033</Option>
                        <Option value="2034">2034</Option>
                        <Option value="2035">2035</Option>
                        <Option value="2036">2036</Option>
                        <Option value="2037">2037</Option>
                        <Option value="2038">2038</Option>
                        <Option value="2039">2039</Option>
                        <Option value="2040">2040</Option>
                        <Option value="2041">2041</Option>
                        <Option value="2042">2042</Option>
                        <Option value="2043">2043</Option>
                        <Option value="2044">2044</Option>
                        <Option value="2045">2045</Option>
                        <Option value="2046">2046</Option>
                        <Option value="2047">2047</Option>
                        <Option value="2048">2048</Option>
                        <Option value="2049">2049</Option>
                        <Option value="2050">2050</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/*  */}

                <Dragger
                  name="file"
                  multiple={false}
                  // action={(file) => {
                  //   const formData = new FormData();
                  //   // formData.append("image", file, file.name);
                  //   // formData.append("purpose", purpose);
                  //   // formData.append("type", type);
                  //   // formData.append("key", objectKey);
                  //   // return uploadFileMutation({
                  //   //   body: formData,
                  //   // });
                  // }}
                  showUploadList={false}
                  //disabled={isUploaded}
                  accept="image/png,image/jpg,image/jpeg"
                >


                  <div className="ba_drag_upload_placeholder">
                    <p className="ant-upload-text text-start ps-3 pb-3">File upload any health records, labs or relevant information (optional)</p>
                  </div>

                  <p className="ba_drag_upload_text"><span>Click Here</span> to drag or drop files</p>


                  {/* {!payload[objectKey][type] ? (
             uploadFileIsLoading && isUploaded ? (
               <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
             ) : (
               <>
                 <p className="ant-upload-drag-icon">
                   <CameraOutlined />
                 </p>
                 <p className="ant-upload-text">{`Upload ${type} page`}</p>
               </>
             )
           ) : (
             <p className="ant-upload-drag-icon">
               <Progress
                 type="circle"
                 strokeColor={{
                   "0%": "#108ee9",
                   "100%": "#87d068",
                 }}
                 percent={100}
               />
             </p>
           )} */}
                </Dragger>
                <div className="row">
                  <div className="col-lg-6 pt-4">
                    <Form.Item
                      name="checkbox"
                      valuePropName="checked"
                      rules={[{ required: true, message: "Please accept terms!" }]}
                    >
                      <Checkbox>
                        I agree <a href="https://teledental.com/terms-and-conditions" target="_blank">terms of use</a> and <a href="https://teledental.com/privacy-policy-teledental" target="_blank"> privacy policy</a>.
                      </Checkbox>
                    </Form.Item>
                  </div>
                  <div className="col-lg-6 pt-4 text-right">
                    <Form.Item className="mb-0">
                      <Button
                        className="signInButton  brix---btn-secondary w-button"
                        // block
                        type="primary"
                        size="large"
                        //  onClick={() => isAppointmentSelected()}
                        onClick={() => showStepClick('2')}
                      >
                        Continue <RightOutlined />
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          ) : null}

          {/* ******************section 2 html ******************* */}

          {showStep2 ? (
            <div className="healthConcern_form">
              <Form
                layout="vertical"
              >
                {/*  onFinish={(body) => updateHandler(body, "profilePhoto")} */}




                <Form.Item
                  label="Past & current medical condition"
                  name="medicalcondition"
                  rules={[
                    { required: true, message: "Field is required!" },
                  ]}
                  className="col-xl-6"

                >
                  <Input placeholder="" onChange={e => setMedicalCont(e.target.value)} />
                </Form.Item>

                <Form.Item
                  name="lastyearantibiotics"
                  label="Have you taken any antibiotics within the last yers"
                  rules={[
                    { required: true, message: "Field is required!" },
                  ]}
                  initialValue="Yes"
                >
                  <Radio.Group buttonStyle="solid" value={antibiotic} onChange={handleAntibioticRadioChange}>
                    <Radio.Button value="Yes">
                      Yes
                    </Radio.Button>
                    <Radio.Button value="No">
                      No
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="lastVisitAllergicantobiotech"
                  label="Are you allergic to any antibiotics"
                  rules={[
                    { required: true, message: "Field is required!" },
                  ]}
                >
                  <Radio.Group buttonStyle="solid" value={allergic} onChange={handleAllergicRadioChange}>
                    <Radio.Button value="Yes">
                      Yes
                    </Radio.Button>
                    <Radio.Button value="No">
                      No
                    </Radio.Button>
                  </Radio.Group>

                  <Input className="mt-2" placeholder="If yes, please share which antibiotics are alergic to?" />
                </Form.Item>

                <Form.Item
                  label="Any medical conditions we need to be aware of?"
                  name="nedicalconditionBeAwar"
                  rules={[
                    { required: true, message: "Field is required!" },
                  ]}
                >
                  <Input placeholder="" onChange={e => setmedicalCondBeAware(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="Any current medication we need to be aware of?"
                  name="conditionBeaware"
                  rules={[
                    { required: true, message: "Field is required!" },
                  ]}
                >
                  <Input placeholder="" onChange={e => setCurrentMedication(e.target.value)} />
                </Form.Item>




                <div className="row">
                  <div className="col-lg-8 pt-3">
                    <Typography.Text>
                      Note, All individuals are responsible to know and be aware of any antibiotics prescribed. If have any allergic reaction, please stop and visit your doctor as soon as possible. All people with infections should get dental treatment as soon as possible.
                    </Typography.Text>
                  </div>
                  <div className="col-lg-4 pt-3 text-right">
                    <Form.Item className="mb-0">
                      <Button
                        className="signInButton  brix---btn-secondary w-button"
                        // block
                        type="primary"
                        size="large"
                        //  onClick={() => isAppointmentSelected()}
                        onClick={() => showStepClick('3')}
                      >
                        Continue <RightOutlined />
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          ) : null}



          {/* section 3 html */}
          {showStep3 ? (
            <div className="healthConcern_form">
              <Form
                layout="vertical"
              >
                {/*  onFinish={(body) => updateHandler(body, "profilePhoto")} */}

                <Form.Item
                  label="Title"
                  name="hasitHurt"
                  initialValue={user?.hasitHurt}
                // rules={[
                //   { required: true, message: "Field is required!" },
                // ]}
                >
                  <Input placeholder="" onChange={e => setTitle(e.target.value)} />
                </Form.Item>

                {/* <div class="ant-col ant-form-item-label">
                <label>Date</label>
              </div> */}
                <div
                  style={{ gap: "3%" }}
                  className={`d-flex flex-column flex-md-row`}
                >
                  <Form.Item label="Date" style={{ flexGrow: 1 }}>
                    <DatePicker onChange={handleDateRangeChange} style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item label="Time" style={{ flexGrow: 1 }}>
                    <RangePicker picker="time" style={{ width: "100%" }} onChange={handleTimeRangeChange} format="HH:mm" />
                  </Form.Item>

                </div>
                <div className="select-wrapper">
                  <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                  />
                </div>
                <br />
                <div
                  style={{ gap: "3%" }}
                  className={`d-flex flex-column flex-md-row`}
                >
                  <Form.Item
                    name="checkbox"
                  >
                    <input type="checkbox" style={{ fontWeight: 500, marginRight: '5px' }} onChange={() => policyChecks('refunds', !refundsCheck)} checked={refundsCheck} />
                    I understand there are no refunds for Teledental consultations completed.
                  </Form.Item>
                </div>
                <div
                  style={{ gap: "3%" }}
                  className={`d-flex flex-column flex-md-row`}
                >
                  <Form.Item
                    name="checkbox2"
                  >
                    <input type="checkbox" style={{ fontWeight: 500, marginRight: '5px' }} onChange={() => policyChecks('terms', !termsCheck)} checked={termsCheck} />
                    I agree with the <a href="https://teledental.com/terms-and-conditions" target="_blank">Terms & Conditions</a>.
                  </Form.Item>
                </div>
                <div className="row pt-5" style={{ justifyContent: 'center' }} >
                  <div className="col-lg-6" style={{ display: fromDentist ? 'none' : 'block' }}>
                    <div className="col-lg-6 text-center" style={{ display: (timerange[0] != null && timerange[1] != null && date != null) ? 'none' : 'block' }}>
                      <Form.Item className="mb-0">
                        <Button
                          className="signInButton  brix---btn-secondary w-button"
                          // block
                          type="primary"
                          size="large"
                          onClick={() => isAppointmentSelected()}
                        // onClick={() => saveAppointment()}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </div>
                    <div style={{ display: (timerange[0] != null && timerange[1] != null && date != null) ? 'block' : 'none' }}>
                      <Form.Item>
                        <StripeCheckout
                          stripeKey={publishableKey}
                          label="Submit"
                          name="Pay With Credit Card"
                          billingAddress
                          shippingAddress
                          amount={priceForStripe}
                          description={`Your appointment charge is $50`}
                          token={payNow}
                          className="signInButton  brix---btn-secondary w-button d-inline-flex justify-content-center align-items-center"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-lg-6" style={{ display: !fromDentist ? 'none' : 'block' }}>
                    <div className="col-lg-12 text-center">
                      <Form.Item className="mb-0">
                        <Button
                          className="signInButton  brix---btn-secondary w-button"
                          // block
                          type="primary"
                          size="large"
                          onClick={() => saveAppointmentFromDentist()}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ visibility: error }}>
                  <span style={{ color: "red" }}>{errorMessage}</span>
                </div>
              </Form>
            </div>
          ) : null}






          {/* <div className="row">
          <div className="col-md-4">
            <p>Select</p>
          </div>
          <div className="col-md-8">
            <p>Slots</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <input type="checkbox"
              defaultChecked={checked}
              checked={checked}
              onChange={() => toggle('check')}
            />
          </div>
          <div className="col-md-8">
            <p>From 10 AM to 11 AM</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <input type="checkbox"
              defaultChecked={checked2}
              checked={checked2}
              onChange={() => toggle('check2')}
            />
          </div>
          <div className="col-md-8">
            <p>From 11 AM to 12 PM</p>
          </div>
        </div>
        <div className="row" style={{display: fromDentist ? 'none' : 'block'}}>
          <div style={{display: (checked || checked2) ? 'none' : 'block'}}>
            <Form.Item>
              <Button
                className="signInButton  brix---btn-secondary w-button d-inline-flex justify-content-center align-items-center"
                block
                type="primary"
                size="large"
                onClick={() => isAppointmentSelected()}
              >
                Submit
              </Button>
            </Form.Item>
        </div>
        <div style={{display: !(checked || checked2) ? 'none' : 'block'}}>
          <Form.Item>
            <StripeCheckout
              stripeKey={publishableKey}
              label="Submit"
              name="Pay With Credit Card"
              billingAddress
              shippingAddress
              amount={priceForStripe}
              description={`Your appointment charge is $50`}
              token={payNow}
              className="signInButton  brix---btn-secondary w-button d-inline-flex justify-content-center align-items-center"
            />
            </Form.Item>
          </div>
        </div>
        <div className="row" style={{display: !fromDentist ? 'none' : 'block'}}>
          <div>
              <Form.Item>
                <Button
                  className="signInButton  brix---btn-secondary w-button d-inline-flex justify-content-center align-items-center"
                  block
                  type="primary"
                  size="large"
                  onClick={() => saveAppointmentFromDentist()}
                >
                  Submit
                </Button>
              </Form.Item>
          </div>
        </div>
        <div className="row" style={{visibility: error}}>
          <span style={{color: "red"}}>Please select one slot</span>
        </div> */}
        </Card>
      </Modal>

    </>
  );
}
