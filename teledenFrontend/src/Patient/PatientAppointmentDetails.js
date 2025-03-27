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
import { appointmentDetails } from "./apis/patientV1";
import { CameraOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Link } from "@mui/material";
import Moment from 'moment';
import TimezoneSelect, { useTimezoneSelect } from 'react-timezone-select'

import jwt from "jsonwebtoken";

const MySwal = withReactContent(Swal);

export default function PatientAppointmentDetails({
  isModalVisible,
  setIsModalVisible,
  appointmentId
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

  const [selectedTimezone, setSelectedTimezone] =useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [selectedTimezoneTemp, setSelectedTimezoneTemp] =useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

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

  // new variables by jam 9 aug 2023

  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(false);
  const [titleVal, setTitleVal] = useState('What Is Your Health Concern Today?');
  const [popupWidth, setpopupWidth] = useState('1200px');


  const showStepClick = (val) => {
    if (val == '1') {
      setShowStep1(true);
      setShowStep2(false);
      setTitleVal('Patient Health Concerns');
      setpopupWidth('1200px');
    }
    if (val == '2') {
      setShowStep1(false);
      setShowStep2(true);
      setTitleVal('Patient Medical History');
      setpopupWidth('1200px');

    }
  };

    const labelStyle = 'original';
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { options, parseTimezone } = useTimezoneSelect({ labelStyle, timeZone })
    const [patient, setPatient] = useState({});

  useEffect(() => {
        showStepClick('1');
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let re = parseTimezone(timeZone);
        setSelectedTimezoneTemp(re);
        
        if (appointmentId != null && appointmentId != "") {
            let mounted = true;
            appointmentDetails(appointmentId)
            .then(items => {
            if(mounted) {
                setPatient(items.data);
                if (items.data.dateOfLastDentalVisit != null && items.data.dateOfLastDentalVisit != "") {
                    let datem = new Date(items.data.dateOfLastDentalVisit);
                    let dm = "";
                    let m = datem.getMonth() + 1;
                    if (m == "1") {
                        dm = "January";
                    } else if (m == "2") {
                        dm = "February";
                    } else if (m == "3") {
                        dm = "March";
                    } else if (m == "4") {
                        dm = "April";
                    } else if (m == "5") {
                        dm = "May";
                    } else if (m == "6") {
                        dm = "June";
                    } else if (m == "7") {
                        dm = "July";
                    } else if (m == "8") {
                        dm = "August";
                    } else if (m == "9") {
                        dm = "September";
                    } else if (m == "10") {
                        dm = "October";
                    } else if (m == "11") {
                        dm = "November";
                    } else if (m == "12") {
                        dm = "December";
                    }
                    setDateMonth(dm);
                    setDateDay(datem.getDate());
                    setDateYear(datem.getFullYear());
                }
            }
            })
            return () => mounted = false;
        }
  }, []);

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
            >
              {/*  onFinish={(body) => updateHandler(body, "profilePhoto")} */}

              <Form.Item
                label="Tell your concern today?"
                name="concernToday"
                className={`width100ForForItems`}
              >
                <TextArea rows={4} placeholder="" value={patient.concern} readOnly />
                <span style={{display: "none"}}>{patient.concern}</span>
              </Form.Item>

              <Form.Item
                label="Is there swelling?"
                name="swelling"
              >
                <Select placeholder="" value={patient.swelling} readOnly>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                  <Option value="other">other</Option>
                </Select>
                <span style={{display: "none"}}>{patient.swelling}</span>
              </Form.Item>
              <Form.Item
                label="Is you have pain, how long has it hurt? If none enter NA"
                name="hasitHurt"

              >
                <Input placeholder="" value={patient.pain} readOnly />
                <span style={{display: "none"}}>{patient.pain}</span>
              </Form.Item>

              <Form.Item
                label="How bad does it hurt( 1 being least, 10 being worst)"
                name="howbaddoesHurt"
              >
                <Select placeholder="" value={patient.hurt} readOnly>
                  <Option value="1">1</Option>
                  <Option value="5">5</Option>
                  <Option value="19">10</Option>
                </Select>
                <span style={{display: "none"}}>{patient.hurt}</span>
              </Form.Item>

              <Form.Item
                label="Where are you located at the time of the visit?"
                name="locatedat"
              >
                <Input placeholder="" value={patient.located} />
                <span style={{display: "none"}}>{patient.located}</span>
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
                    <Select placeholder="Month" value={dateMonth} readOnly>
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
                  <span style={{display: "none"}}>{dateMonth}</span>
                  </Form.Item>
                </div>

                <div className="pe-3 ba_lastDental_visit_day">
                  <Form.Item
                    label=""
                    name="dentalvisitday"
                  >
                    <Select placeholder="Day" value={dateDay} readOnly>
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
                    <span style={{display: "none"}}>{dateDay}</span>
                  </Form.Item>
                </div>

                <div className="ba_lastDental_visit_year">
                  <Form.Item
                    label=""
                    name="dentalvisityear"
                  >
                    <Select placeholder="Year" value={dateYear} readOnly>
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
                    <span style={{display: "none"}}>{dateYear}</span>
                  </Form.Item>
                </div>
              </div>

              <div className="row">
                <div className="text-right">
                  <Form.Item className="mb-0">
                    <Button
                      className="signInButton  brix---btn-secondary w-button"
                      // block
                      type="primary"
                      size="large"
                      //  onClick={() => isAppointmentSelected()}
                      onClick={() => showStepClick('2')}
                    >
                      Next <RightOutlined />
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
              <Form.Item
                label="Past & current medical condition"
                name="medicalcondition"
                className="col-xl-6"

              >
                <Input placeholder="" value={patient.medicalCond} readOnly />
                <span style={{display: "none"}}>{patient.medicalCond}</span>
              </Form.Item>

              <Form.Item
              name="lastyearantibiotics"
                label="Have you taken any antibiotics within the last yers"
                initialValue={patient.antibiotic == "false" ? "No" : "Yes"}
              >
                <Radio.Group buttonStyle="solid" value={antibiotic} readOnly>
                  <Radio.Button value="Yes">
                    Yes
                  </Radio.Button>
                  <Radio.Button value="No">
                    No
                  </Radio.Button>
                </Radio.Group>
                <span style={{display: "none"}}>{patient.antibiotic}</span>
              </Form.Item>

              <Form.Item
                name="lastVisitAllergicantobiotech"
                label="Are you allergic to any antibiotics"
                initialValue={patient.allergic}
              >
                <Radio.Group buttonStyle="solid" value={allergic} readOnly>
                  <Radio.Button value="Yes">
                    Yes
                  </Radio.Button>
                  <Radio.Button value="No">
                    No
                  </Radio.Button>
                </Radio.Group>
                <span style={{display: "none"}}>{patient.allergic}</span>
                <Input className="mt-2" placeholder="If yes, please share which antibiotics are alergic to?" />
              </Form.Item>

              <Form.Item
                label="Any medical conditions we need to be aware of?"
                name="nedicalconditionBeAwar"
              >
                <Input placeholder="" readOnly value={patient.medicalCondBeAware} />
                <span style={{display: "none"}}>{patient.medicalCondBeAware}</span>
              </Form.Item>

              <Form.Item
                label="Any current medication we need to be aware of?"
                name="conditionBeaware"
              >
                <Input placeholder="" readOnly value={patient.currentMedication} />
                <span style={{display: "none"}}>{patient.currentMedication}</span>
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
                      onClick={() => showStepClick('1')}
                    >
                      <LeftOutlined /> Previous
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        ) : null}
      </Card>
    </Modal>
  );
}
