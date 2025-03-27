import { Card, Steps, message, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { approvedDentist, getUnApprovedDentists } from "./apis/dentistV1";
import { useUserContext } from "../Context/userContext";
import {Checkbox} from 'antd';
import Header from "../Commons/Header";

const { Step } = Steps;

const UnApprovedDentist = () => {
    const [dentists, setList] = useState([]);

    const { user, status } = useUserContext();

    useEffect(() => {
     let mounted = true;
     getUnApprovedDentists(user?._id)
       .then(items => {
         if(mounted) {
           setList(items)
         }
       })
     return () => mounted = false;
   }, []);
   
   function postSelfService(email, isApproved) {
        try {
        // simulate api call
        // setTimeout(()=> fetchConfigApi(),500)
        approvedDentist({email: email, isApproved: isApproved}).then(items => {
              setList(items)
          });
        } catch (e) {
        console.log("error response", e.response);
        }
    }
  return (
    <><Header />
        <Card style={{"marginTop": "70px" }}>
          <h2>UnApproved Dentists</h2>

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
                      <div>
                          <table style={{ width: '100%' }}>
                              <thead>
                                  <tr className="row">
                                      <th className="col-md-2">First Name</th>
                                      <th className="col-md-2">Last Name</th>
                                      <th className="col-md-4">Email</th>
                                      <th className="col-md-1">Approved</th>
                                      <th className="col-md-3">Business Name</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {dentists?.data?.map((person, i) => (
                                      <tr className="row">
                                          <td className="col-md-2">{person.firstName}</td>
                                          <td className="col-md-2">{person.lastName}</td>
                                          <td className="col-md-4">{person.email}</td>
                                          <td className="col-md-1"><Checkbox
                                              checked={person.isApproved}
                                              onChange={() => postSelfService(person.email, !person.isApproved)} />
                                          </td>
                                          <td className="col-md-3">{person.businessName}</td>
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

export default UnApprovedDentist;
