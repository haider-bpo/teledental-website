import { Spin } from "antd";
import * as React from "react";
import { Redirect } from "react-router";
import { useUserContext } from "../Context/userContext";
import AccountForm from "./AccountForm";
import VerificationForm from "./VerificationForm";

export default function IdentityVerification() {
  const { paymentInfo, paymentInfoStatus } = useUserContext();
  return (
    <Spin spinning={paymentInfoStatus !== "success"}>
      {!paymentInfo?.accountId ? (
        <AccountForm />
      ) : !paymentInfo?.chargesEnabled ? (
        <VerificationForm />
      ) : (
        <Redirect to="/dentists/profile" />
      )}
    </Spin>
  );
}
