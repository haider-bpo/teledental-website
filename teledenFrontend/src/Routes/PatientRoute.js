import { Layout } from "antd";
import jwtDecode from "jwt-decode";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../Context/userContext";
const { Content } = Layout;

export default function PatientRoute({ component: Component, auth, ...rest }) {
  let { user, token } = useUserContext();

  // To fix null user issue during social login
  if (!user && token) {
    user = jwtDecode(token);
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {user && user.model === "patients" ? (
              <>
                <Layout>
                  <Content
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      flex: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Component {...props} />
                  </Content>
                </Layout>
              </>
            ) : (
              <Redirect to="/" />
            )}
          </>
        );
      }}
    />
  );
}
