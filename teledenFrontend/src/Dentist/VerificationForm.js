import { Button, Card, Col, message, Row, Spin, Typography } from "antd";
import * as React from "react";
import { useMutation } from "react-query";
import constants from "../constants";
import { verifyAccount } from "./apis/dentistV1";
import { useUserContext } from "../Context/userContext";
import VerificationUpload from "./VerificationUpload";

export default function VerificationForm() {
  const [accountVerified, setAccountVerified] = React.useState(false);
  const [payload, setPayload] = React.useState({
    additional_document: {
      back: null,
      front: null,
    },
    document: {
      back: null,
      front: null,
    },
  });

  const {
    mutateAsync: verifyAccountMutation,
    isLoading: verifyAccountIsLoading,
  } = useMutation(verifyAccount);
  const { refetchPaymentInfo, user } = useUserContext();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await verifyAccountMutation({ body: payload });
      setAccountVerified(true);
    } catch (error) {
      message.error(error.errMsg);
    }
  }

  React.useEffect(() => {
    if (accountVerified) {
      var interval = setInterval(() => {
        refetchPaymentInfo();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [accountVerified]);

  return (
    <Spin spinning={accountVerified}>
      <Card
        className="shadow-sm"
        style={{
          // maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={
            {
              // padding: "10px 20px",
              // display: "flex",
              // justifyContent: "center",
              // flexDirection: "column",
              // alignItems: "center",
            }
          }
        >
          {<Typography.Title level={3}>Identity Verification</Typography.Title>}
          <form onSubmit={onSubmit}>
            <div
              className={`d-flex flex-column flex-md-row justify-content-between`}
            >
              <div style={{ maxWidth: "45%", width: "100%" }}>
                <Typography.Title level={5}>Personal Identity</Typography.Title>
                <Typography.Text>
                  Please upload any of the following document in order to verify
                  the identity of {user?.firstName} {user?.lastName}
                </Typography.Text>
                <Col>
                  <li>• Passport</li>
                  <li>• Driver's License</li>
                  <li>• Identity Card</li>
                  <li>• Residence Permit</li>
                </Col>
                <Row
                  style={{
                    // margin: "auto 0",
                    marginTop: "auto",
                  }}
                  gutter={30}
                >
                  <div className={`width100`}>
                    <VerificationUpload
                      setPayload={setPayload}
                      payload={payload}
                      purpose={constants.STRIPE.FILE.PURPOSE.IDENTITY_DOCUMENT}
                      type={"front"}
                      objectKey={"document"}
                    />
                  </div>
                  <div className={`width100 marginTopForMobileViewOnly`}>
                    <VerificationUpload
                      setPayload={setPayload}
                      payload={payload}
                      purpose={constants.STRIPE.FILE.PURPOSE.IDENTITY_DOCUMENT}
                      type={"back"}
                      objectKey={"document"}
                    />
                  </div>
                </Row>
              </div>

              <div style={{ maxWidth: "45%", width: "100%" }}>
                <Typography.Title level={5}>Home Address</Typography.Title>
                <Typography.Text>
                  Please upload any of the following document in order to verify
                  the home address of {user?.firstName} {user?.lastName}
                </Typography.Text>
                <Col>
                  <li>• Proof of residence</li>
                  <li>• Landlord letter</li>
                  <li>• Utility bill</li>
                  <li>• Bank Statement</li>
                  <li>• Mortgage Statement</li>
                  <li>• Government issued document</li>
                </Col>
                <Row
                  style={{
                    margin: "10px 0",
                  }}
                  gutter={30}
                >
                  <div className={`width100`}>
                    <VerificationUpload
                      setPayload={setPayload}
                      payload={payload}
                      purpose={
                        constants.STRIPE.FILE.PURPOSE.ADDITIONAL_VERIFICATION
                      }
                      type={"front"}
                      objectKey={"additional_document"}
                    />
                  </div>
                  <div className={`width100 marginTopForMobileViewOnly`}>
                    <VerificationUpload
                      setPayload={setPayload}
                      payload={payload}
                      purpose={
                        constants.STRIPE.FILE.PURPOSE.ADDITIONAL_VERIFICATION
                      }
                      type={"back"}
                      objectKey={"additional_document"}
                    />
                  </div>
                </Row>
              </div>
            </div>
            <div className={`d-flex justify-content-center`}>
              <Button
                style={{
                  width: "160px",
                  margin: "20px auto 0",
                }}
                className="confirm-btn"
                type="primary"
                htmlType="submit"
                size="large"
                loading={verifyAccountIsLoading}
                disabled={
                  !payload.document.back ||
                  !payload.document.front ||
                  !payload.additional_document.back ||
                  !payload.additional_document.front
                }
              >
                CONTINUE
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </Spin>
  );
}
