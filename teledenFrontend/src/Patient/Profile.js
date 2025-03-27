import { Spin, Tabs, message, Alert } from "antd";
import * as React from "react";
import { useMutation } from "react-query";
import { useUserContext } from "../Context/userContext";
import Allergies from "./Allergies";
import { updateProfile } from "./apis/patientV1";
import BasicProfile from "./BasicProfile";
import CurrentMedications from "./CurrentMedications";
import MedicalHistory from "./MedicalHistory";
import MyPayments from "./MyPayments";
import makeStyles from '@mui/styles/makeStyles';
import Header from "../Commons/Header";

const useStyles = makeStyles((theme) => ({
  tabs: {
    [theme.breakpoints.down('md')]: {
      // minWidth: "0",
    },
  },
}));

const { TabPane } = Tabs;

function Profile() {
  const classes = useStyles();
  const [file, setFile] = React.useState(null);
  const [tabPosition, setTabPosition] = React.useState(
    window.innerWidth > 768 ? "left" : "top"
  );

  const { user, refetch, status, refetchProfilePhoto, paymentInfo } =
    useUserContext();

  const { isLoading, mutateAsync } = useMutation(({ body }) =>
    updateProfile({ body })
  );

  const updateHandler = async (body) => {
    try {
      if (file) {
        let formData = new FormData();
        for (let key in body) {
          formData.append(key, body[key]);
        }
        formData.append("image", file, file.name);
        await mutateAsync({ body: formData });
      } else {
        await mutateAsync({ body });
      }
      await refetch();
      if (file) {
        setTimeout(refetchProfilePhoto, 1000);
      }
      message.success("Profile Updated successfully");
    } catch (error) {
      message.error(error.errMsg);
    }
  };

  const tabChangeHandler = (e) => {
    setFile(null);
  };

  const handleResize = () => {
    console.log(window.innerWidth);
    setTabPosition(window.innerWidth > 768 ? "left" : "top");
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <><Header />
      <div style={{marginTop: "5%"}}>
        {!paymentInfo?.card?.last4 && (
          <Alert
            message=""
            description="Connect your payment method so that you can consult with our dentists."
            type="warning"
            />
        )}
        {status === "loading" ? (
          <Spin size="large" />
        ) : (
          // <Card
          //   title="Profile"
          //   headStyle={{
          //     fontSize: "24px !important",
          //     fontWeight: "bold",
          //     textAlign: "center",
          //   }}
          //   style={{ minHeight: "800px" }}
          //   className="form-card-width"
          //   type="inner"
          // >
          (<Tabs
            // tabPosition="left"
            tabPosition={tabPosition}
            className={`profile shadow-sm ${classes.tabs}`}
            onChange={tabChangeHandler}
          >
            <TabPane tab="Basic Profile" key="1">
              <BasicProfile
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler}
                setFile={setFile}
                file={file} />
            </TabPane>
            <TabPane tab="My Payments" key="2">
              <MyPayments
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler} />
            </TabPane>
            <TabPane tab="Medical History" key="3">
              <MedicalHistory
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler} />
            </TabPane>
            <TabPane tab="Allergies" key="4">
              <Allergies
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler} />
            </TabPane>
            <TabPane tab="Current Medications" key="5">
              <CurrentMedications
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler} />
            </TabPane>
          </Tabs>)

          // </Card>
        )}
      </div></>
  );
}

export default Profile;
