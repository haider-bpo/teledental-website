import { Card, Steps, message, Spin, Form, Button, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { confirmVerifiedAccount } from "../Commons/apis/commonV1";
import { useUserContext } from "../Context/userContext";
import logo from '../assets/img/NewLogo.f770c6ff.png';


const { Step } = Steps;

const ConfirmEmailVerification = () => {
    const [dentists, setList] = useState([]);

    const { user, status } = useUserContext();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let email = params.get('email')
     let mounted = true;
     confirmVerifiedAccount(email)
       .then(items => {
         if(mounted) {
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
    <>
        <Card>          
              <>
                  <div className="parent-container">
                    <img width="180" src={logo} alt=""></img>
                    <div className="verified-text">
                        <p>Your account has been verified.</p>
                        <p>Thank you.</p>
                    </div>
                    <div className="visit">
                        Teledental.com
                    </div>
                    <div className="thanks">
                        <p>Thanks,</p>
                        <span className="team">Team</span><span class="teledental">Teledental</span>
                    </div>
                    <div className="unsubscribe">
                        Unsubscribe
                    </div>
                </div>
              </>
      </Card></>
  );
};

export default ConfirmEmailVerification;
