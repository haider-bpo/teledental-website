import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../Context/userContext";

export default function PublicRoute({
  restrictIfDentistIsNotActivated, // to restrict the dentist to go to home page
  component: Component,
  ...rest
}) {
  const { user } = useUserContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        window.localStorage.getItem("charges") === "false" &&
        user?.model === "dentists" &&
        restrictIfDentistIsNotActivated ? (
          <Redirect to={"/dentists/identity-verification"} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
