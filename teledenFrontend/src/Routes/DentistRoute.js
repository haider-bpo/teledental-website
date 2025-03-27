import { Layout } from "antd";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../Context/userContext";
const { Content } = Layout;

export default function DentistsRoute({
  component: Component,
  accountIsActivated = true,
  auth,
  ...rest
}) {
  const { user, paymentInfo } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {user &&
            user.model === "dentists" &&
            accountIsActivated === Boolean(paymentInfo?.chargesEnabled) ? (
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
