import { Card, Steps, message, Spin, Form, Button, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { updateAppointment, getUnApprovedAppointments } from "./apis/dentistV1";
import { useUserContext } from "../Context/userContext";
import {Checkbox} from 'antd';
import Header from "../Commons/Header";
import jwt from "jsonwebtoken";
import Moment from 'moment';
import Pagination from '../Commons/Pagination';
import { CameraOutlined, RightOutlined } from "@ant-design/icons";
import { useMemo } from 'react';
import PatientAppointmentDetails from "../Patient/PatientAppointmentDetails";
import { getSubscription } from "../Commons/apis/commonV1"
import Subscription from "../Commons/Subscription";

const { Step } = Steps;

const UnApprovedAppointments = () => {
    const [dentists, setList] = useState([]);

    const { user, status } = useUserContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const [isAppointmentModalVisible, setIsAppointmentModalVisible] =
    React.useState(false);
    const [patientIdForData, setpatientIdForData] = React.useState("");

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dentists?.data?.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [isSubscriptionModalVisible, setSubscriptionModalVisible] =
    React.useState(false);
    const [isTrialGet, setTrialGet] =
    React.useState(false);
  

    useEffect(() => {
     let mounted = true;
     getUnApprovedAppointments(user?._id)
       .then(items => {
         if(mounted) {
           setList(items)
         }
       })
       if (process.env.REACT_APP_IS_SUBSCRIPTION == "true" && user?.model != "patients") {
        getSubscription(user?._id, user?.model)
          .then(items => {
            if(mounted && items != null && items.message == "Success!") {
              setTrialGet(true);
              if (new Date(items.data.endDate) < new Date())
                setSubscriptionModalVisible(true);
            } else {
              setSubscriptionModalVisible(true);
            }
          });
        } else {
          if (user?.model != "patients")
            setSubscriptionModalVisible(true);  
          else
            setSubscriptionModalVisible(false);
        }
     return () => mounted = false;
   }, []);
   
   async function requestAppointmentHandler(pId) {
    setpatientIdForData(pId);
    setIsAppointmentModalVisible(true);
   }

   function postSelfService(appointment, isApproved) {
        try {
            const token = generateToken(user, appointment.activeChatId);
            let pLink = `https://meet.teledental.com/?token=${token}`;
            appointment.dentistLink = pLink;
            appointment.isApproved = isApproved;
            updateAppointment(appointment).then(items => {
              setList(items)
          });
        } catch (e) {
        console.log("error response", e.response);
        }
    }

    function redirectLink(link) {
        try {
            window.open(link, "_blank");
        } catch (e) {
            console.log("error response", e.response);
        }
    }

    function generateToken(user, activeChatId) {
        return jwt.sign(
          {
            model: user?.model,
            name: user?.firstName,
            userId: user?._id,
            meetingId: activeChatId,
            app_id: 'teledental'
          },
          "-123abcl1;"
        );
    }
  return (
    <><Header />
        <Card style={{"marginTop": "70px" }}>
          <h2 className="blue_heading">Appointments</h2>

          {status === "loading" ? (
              <Spin
                  size="large"
                  style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "42vh",
                  }} />
          ) : (
              <>
                  <div style={{ padding: "20px 0px 30px" }}>
                      <div className='cstm_approved_table'>
                          <table style={{ width: '100%' }}>
                              <thead>
                                  <tr className="row">
                                      <th className="col-md-2">Patient Name</th>
                                      <th className="col-md-2">Patient Email</th>
                                      <th className="col-md-2">Title</th>
                                      <th className="col-md-2">Appointment Date</th>
                                      <th className="col-md-1">slot</th>
                                      <th className="col-md-1">Patient Details</th>
                                      {/* <th className="col-md-1">Concern</th>
                                      <th className="col-md-1">Located</th>
                                      <th className="col-md-1">Medical Condition</th>
                                      <th className="col-md-1">Current Medication</th> */}
                                      <th className="col-md-1" width='100'>Approved</th>
                                      <th className="col-md-1">Appointment Link</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {currentPosts?.map((person, i) => (
                                      <tr className="row">
                                          <td className="col-md-2">{person.patientName}</td>
                                          <td className="col-md-2">{person.patientEmail}</td>
                                          <td className="col-md-2">{person.title}</td>
                                          <td className="col-md-2">{Moment(person.appointmentDate).format('MM-DD-YYYY')}</td>
                                          <td className="col-md-1">{person.slot}</td>
                                          <td className="col-md-1">
                                                { !person.fromDentist && <Form.Item className="mb-0">
                                                <Tooltip title="Patient appointment info">
                                                    <Button
                                                        style={{ fontSize: "20px"}}
                                                        onClick={() => requestAppointmentHandler(person.appointmentId)} >
                                                        <i className="fa fa-info-circle"></i>
                                                    </Button>
                                                    </Tooltip>
                                                </Form.Item>
                                                }
                                          </td>
                                          {/* <td className="col-md-1">{person.concern}</td>
                                          <td className="col-md-1">{person.located}</td>
                                          <td className="col-md-1">{person.medicalCondBeAware}</td>
                                          <td className="col-md-1">{person.currentMedication}</td> */}
                                          <td width='100' className="col-md-1"><Checkbox
                                              checked={person.isApproved}
                                              disabled={person.isApproved}
                                              onChange={() => postSelfService(person, !person.isApproved)} />
                                          </td>
                                          <td className="col-md-1">
                                                { person.isApproved && <Form.Item className="mb-0">
                                                <Tooltip title="Join Link">
                                                    <Button
                                                        style={{ fontSize: "20px"}}
                                                        onClick={() => redirectLink(person.dentistLink)} >
                                                        <i className="fa fa-sign-in"></i>
                                                    </Button>
                                                    </Tooltip>
                                                </Form.Item>
                                                }
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                          { dentists?.data?.length > 0 && <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={dentists?.data?.length}
                                pageSize={postsPerPage}
                                onPageChange={page => setCurrentPage(page)}
                            />}
                      </div>
                  </div>
              </>
          )}
          {isAppointmentModalVisible && <PatientAppointmentDetails
          isModalVisible={isAppointmentModalVisible}
          setIsModalVisible={setIsAppointmentModalVisible}
          appointmentId={patientIdForData}
        />}
      </Card>
      <Subscription
          isModalVisible={isSubscriptionModalVisible}
          setIsModalVisible={setSubscriptionModalVisible}
          isTrialGet={isTrialGet}
        />
      </>
  );
};

export default UnApprovedAppointments;
