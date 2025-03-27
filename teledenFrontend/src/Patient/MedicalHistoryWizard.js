import { Card, Form, Input, Select, Upload, Button, DatePicker, Modal, Checkbox, Progress, Spin, Radio, Typography, message, } from "antd";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../Context/userContext";
import { addmedicalHistory } from "./apis/patientV1";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import Dragger from "antd/lib/upload/Dragger";
import { CameraOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "@mui/material";
import Moment from 'moment';
import TimezoneSelect, { useTimezoneSelect } from 'react-timezone-select'
import jwt from "jsonwebtoken";

const MySwal = withReactContent(Swal);

export default function MedicalHistoryWizard({
  isModalVisible,
  setIsModalVisible
}) {
  const closeModal = () => {
    setIsModalVisible(false);
    ResetFields();
  };

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
  const [antibiotic, setAntibiotic] = React.useState('Yes');
  const [allergic, setAllergic] = React.useState(false);
  const [videoConsult, setVideoConsult] = React.useState(false);
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

  const [selectedTimezone, setSelectedTimezone] =useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [selectedTimezoneTemp, setSelectedTimezoneTemp] =useState(
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

  const handleVideoConsultRadioChange = (event) => {
    setVideoConsult(event.target.value);
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

  function generateToken() {
    return jwt.sign(
      {
        model: user?.model,
        name: user?.firstName,
        userId: user?._id,
        meetingId: "hjfkdhjkfdsjghjgd",
        app_id: 'teledental'
      },
      "-123abcl1;"
    );
  }

  async function saveMedicalHistory() {
    try {
      const token = generateToken();
      let pLink = `https://meet.teledental.com/?token=${token}`;
      let datelocal = new Date().getTime().toString();
      let appointment = {
        patientId: user?._id
        , patientName: user?.firstName + " " + user?.lastName
        , patientEmail: user?.email
        , dentistId: "63585421a5492d58f67a8a21"
        , patientLink: videoConsult? pLink : ""
        , dentistLink: ""
        , isApproved: false
        , activeChatId: "hjfkdhjkfdsjghjgd"
        , medicalHistoryId: datelocal
        , dentistName: "Teledental Chat"
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
        , timeZone: selectedTimezone?.label == undefined ? selectedTimezoneTemp?.label : selectedTimezone?.label
        , videoConsult: videoConsult
      }

      await addmedicalHistory(appointment);
      closeModal();
      message.success("Medical History Saved.", 20);
      showStepClick("1");
      ResetFields();
    } catch (e) {
      console.log("error response", e.response);
    }
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
        saveMedicalHistory();
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


  const form1Submit = () => {
    showStepClick('2');
  }

  const form2Submit = () => {
    if (videoConsult == "true")
      showStepClick('3');
    else
      saveMedicalHistory();
  }

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
    showStepClick('1');
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let re = parseTimezone(timeZone);
    setSelectedTimezoneTemp(re);
  }, []);

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const { RangePicker } = DatePicker;


  return (
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
              onFinish={form1Submit}
            >
              <Form.Item
                label="Tell your concern today?"
                name="concernToday"
                rules={[
                  { required: true, message: "This field is required!" },
                ]}
                className={`width100ForForItems`}
                initialValue={concern}
              >
                <TextArea rows={4} placeholder="" onChange={e => setConcern(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Is there swelling?"
                name="swelling"
                rules={[
                  { required: true, message: "Field is required" },
                ]}
                initialValue={swelling}
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
                initialValue={pain}
              >
                <Input placeholder="" onChange={e => setPain(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="How badly does it hurt( 1 being least, 10 being worst)"
                name="howbaddoesHurt"
                rules={[
                  { required: true, message: "Field is required" },
                ]}
                initialValue={hurt}
              >
                <Select placeholder="" value={hurt} onChange={handleHurtSelectChange}>
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
                </Select>
              </Form.Item>

              <Form.Item
                label="Where are you located at the time of the visit?"
                name="locatedat"
                rules={[
                  { required: true, message: "Field is required" },
                ]}
                initialValue={located}
              >
                <Input placeholder="" onChange={e => setLocated(e.target.value)} />
              </Form.Item>

              <div className="ant-col ant-form-item-label">
                <label>Date of the last dental visit? (optional)</label>
              </div>
              <div className="d-flex ba_lastDental_visit">
                <div className="pe-3 ba_lastDental_visit_month">
                  <Form.Item
                    label=""
                    name="dentalvisitdate"
                    initialValue={dateMonth}
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
                    initialValue={dateDay}
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
                    initialValue={dateYear}
                  >
                    <Select placeholder="Year" value={dateYear} onChange={handleDateYearSelectChange}>
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
                showUploadList={false}
                accept="image/png,image/jpg,image/jpeg"
              >


                <div className="ba_drag_upload_placeholder">
                  <p className="ant-upload-text text-start ps-3 pb-3">File upload any health records, labs or relevant information (optional)</p>
                </div>

                <p className="ba_drag_upload_text"><span>Click Here</span> to drag or drop files</p>
              </Dragger>
              <div className="row">
                <div className="col-lg-6 pt-4">
                  <Form.Item
                    name="checkbox"
                    valuePropName="checked"
                    rules={[{ required: true, message: "Please accept terms!" }]}
                    initialValue={termsCheck}
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
                      type="primary"
                      size="large"
                      htmlType="submit"
                      // onClick={() => showStepClick('2')}
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
              onFinish={form2Submit}
            >
              <Form.Item
                label="Past & current medical condition"
                name="medicalcondition"
                rules={[
                  { required: true, message: "Field is required!" },
                ]}
                className="col-xl-6"
                initialValue={medicalCond}
              >
                <Input placeholder="" onChange={e => setMedicalCont(e.target.value)} />
              </Form.Item>

              <Form.Item
              name="lastyearantibiotics"
                label="Have you taken any antibiotics within the last yers"
                rules={[
                  { required: true, message: "Field is required!" },
                ]}
                initialValue={antibiotic}
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
                initialValue={allergic}
              >
                <Radio.Group buttonStyle="solid" value={allergic} onChange={handleAllergicRadioChange}>
                  <Radio.Button value="Yes">
                    Yes
                  </Radio.Button>
                  <Radio.Button value="No">
                    No
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
               name="antibioticsIfAny"
               initialValue={allergicDesc}>
                <Input className="mt-2" placeholder="If yes, please share which antibiotics are alergic to?"
                onChange={e => setAllergicDes(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Any medical conditions we need to be aware of?"
                name="nedicalconditionBeAwar"
                rules={[
                  { required: true, message: "Field is required!" },
                ]}
                initialValue={medicalCondBeAware}
              >
                <Input placeholder="" onChange={e => setmedicalCondBeAware(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Any current medication we need to be aware of?"
                name="conditionBeaware"
                rules={[
                  { required: true, message: "Field is required!" },
                ]}
                initialValue={currentMedication}
              >
                <Input placeholder="" onChange={e => setCurrentMedication(e.target.value)} />
              </Form.Item>

              <Form.Item
                name="needVideoConsult"
                label="Are you need a video consult?"
                rules={[
                  { required: true, message: "Field is required!" },
                ]}
                initialValue={allergic}
              >
                <Radio.Group buttonStyle="solid" value={allergic} onChange={handleVideoConsultRadioChange}>
                  <Radio.Button value="true">
                    Yes
                  </Radio.Button>
                  <Radio.Button value="false">
                    No
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>


              <div className="row">
                <div className="col-lg-8 pt-3">
                  <Typography.Text>
                    Note, All individuals are responsible to know and be aware of any antibiotics prescribed. If have any allergic reaction, please stop and visit your doctor as soon as possible. All people with infections should get dental treatment as soon as possible.
                  </Typography.Text>
                </div>
                <div>
                  <div className="col-lg-4 pt-3" style={{float: "left"}}>
                    <Form.Item className="mb-0">
                      <Button
                        className="signInButton  brix---btn-secondary w-button"
                        type="primary"
                        size="large"
                        onClick={() => showStepClick('1')}
                      >
                       <LeftOutlined /> Back 
                      </Button>
                    </Form.Item>
                  </div>
                  {videoConsult == "true" ? <div className="col-lg-4 pt-3" style={{float: "right"}}>
                    <Form.Item className="mb-0">
                      <Button
                        className="signInButton  brix---btn-secondary w-button"
                        type="primary"
                        size="large"
                        htmlType="submit"
                        // onClick={() => showStepClick('3')}
                      >
                        Continue <RightOutlined />
                      </Button>
                    </Form.Item>
                  </div> :
                  <div className="col-lg-4 pt-3" style={{float: "right"}}>
                    <Form.Item className="mb-0">
                      <Button
                        className="signInButton  brix---btn-secondary w-button"
                        type="primary"
                        size="large"
                        htmlType="submit"
                        // onClick={() => saveMedicalHistory()}
                      >
                        Submit <RightOutlined />
                      </Button>
                    </Form.Item>
                  </div>}
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
              <Form.Item
                label="Title"
                name="hasitHurt"
                initialValue={user?.hasitHurt}
              >
                <Input placeholder="" onChange={e => setTitle(e.target.value)} />
              </Form.Item>
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
              <br/>
              <div
                style={{ gap: "3%" }}
                className={`d-flex flex-column flex-md-row`}
              >
                <Form.Item
                    name="checkbox"
                  >
                    <input type="checkbox" style={{fontWeight: 500, marginRight: '5px' }} onChange={() => policyChecks('refunds', !refundsCheck)} checked={refundsCheck} />
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
                    <input type="checkbox" style={{fontWeight: 500, marginRight: '5px'}} onChange={() => policyChecks('terms', !termsCheck)} checked={termsCheck} />
                     I agree with the <a href="https://teledental.com/terms-and-conditions" target="_blank">Terms & Conditions</a>.
                  </Form.Item>
              </div>
              <div className="row pt-5">
                  <div>
                    <div className="col-lg-12 text-right" style={{display: (timerange[0] != null && timerange[1] != null && date != null) ? 'none' : 'block'}}>
                      <Form.Item className="mb-0">
                        <Button
                          className="signInButton  brix---btn-secondary w-button"
                          type="primary"
                          size="large"
                          onClick={() => isAppointmentSelected()}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </div>
                    <div style={{display: (timerange[0] != null && timerange[1] != null && date != null) ? 'block' : 'none'}}>
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
                </div>
              <div className="row" style={{visibility: error}}>
                <span style={{color: "red"}}>{errorMessage}</span>
              </div> 
            </Form>
          </div>
        ) : null}
      </Card>
    </Modal>
  );
}
