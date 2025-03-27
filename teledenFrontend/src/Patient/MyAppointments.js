import { Card, Steps, message, Spin, Form, Button, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { getAppointments } from "./apis/patientV1";
import { useUserContext } from "../Context/userContext";
import {Checkbox} from 'antd';
import Header from "../Commons/Header";
import jwt from "jsonwebtoken";
import Moment from 'moment';

const { Step } = Steps;

const MyAppointments = () => {
    const [dentists, setList] = useState([]);

    const { user, status } = useUserContext();

    useEffect(() => {
     let mounted = true;
     getAppointments(user?._id)
       .then(items => {
         if(mounted) {
           setList(items)
         }
       })
     return () => mounted = false;
   }, []);

    function redirectLink(link) {
        try {
            window.open(link, "_blank");
        } catch (e) {
            console.log("error response", e.response);
        }
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
                  <div style={{ padding: "30px 0px" }}>
                      <div className="cstm_approved_table">
                          <table style={{ width: '100%' }}>
                              <thead>
                                  <tr className="row">
                                      <th className="col-md-3">Dentist Name</th>
                                      <th className="col-md-3">Slots</th>
                                      <th className="col-md-2">Created Date</th>
                                      <th className="col-md-2">Status</th>
                                      <th className="col-md-1">Appointment Link</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {dentists?.data?.map((person, i) => (
                                      <tr className="row">
                                          <td className="col-md-3">{person.dentistName}</td>
                                          <td className="col-md-3">{person.slot}</td>
                                          <td className="col-md-2">{Moment(person.createdAt).format('MM-DD-YYYY')}</td>
                                          <td className="col-md-2">{person.isApproved? 'Approved' : 'Pending'}</td>
                                          <td className="col-md-1">
                                                { person.isApproved && <Form.Item className="mb-0">
                                                <Tooltip title="Join Link">
                                                    <Button
                                                        style={{ fontSize: "20px"}}
                                                        onClick={() => redirectLink(person.patientLink)} >
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
                      </div>
                  </div>
              </>
          )}
      </Card></>
  );
};

export default MyAppointments;
