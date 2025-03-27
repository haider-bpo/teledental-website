import { Card, Steps, message, Spin } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useUserContext } from "../Context/userContext";
import { updateDentistProfile } from "./apis/dentistV1";
import BasicInfo from "./BasicInfo";
import BusinessDetails from "./BusinessDetails";
import EducationTraining from "./EducationTraining";
import ProfessionalExperience from "./ProfessionalExperience";
import Specialties from "./Specialties";
import PersonalStatement from "./PersonalStatement";
import { serialize } from "object-to-formdata";

const { Step } = Steps;

const Profile = () => {
  const [fileList, setFileList] = React.useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const onChange = (current) => {
    setActiveStep(current);
    setFileList([]);
  };

  const { user, refetch, status, refetchProfilePhoto } = useUserContext();

  const { isLoading, mutateAsync } = useMutation(({ body }) =>
    updateDentistProfile({ body })
  );

  const updateHandler = async (body, imageKey) => {
    try {
      // if (fileList.length) {
      if (body.dob) {
        body = { ...body, dob: body.dob.toDate() };
      }
      // const formData = serialize(body);
      const formData = new FormData();
      formData.append("payload", JSON.stringify(body));
      fileList.forEach((file) => {
        formData.append(imageKey, file, file.name);
      });
      await mutateAsync({ body: formData });
      // } else {
      // await mutateAsync({ body });
      // }
      await refetch();
      if (fileList.length && imageKey === "profilePhoto") {
        setTimeout(refetchProfilePhoto, 1000);
      }
      message.success("Profile Updated successfully");
    } catch (error) {
      console.log({ error });
      message.error(error.errMsg);
    }
  };
  return (
    <Card style={{marginTop: "5%"}}>
      <h2>Profile</h2>
      {/* <div className={`profileStepper`}>
        <Steps
          type="navigation"
          size="small"
          current={activeStep}
          onChange={onChange}
          className={`profileSteps`}
        >
          <Step status="finish" title="Basic Info" />
          <Step status="process" title="Business Details" />
          <Step status="wait" title="Education and Training" />
          <Step status="wait" title="Professional Experience" />
          <Step status="wait" title="Specialties" />
          <Step status="wait" title="Personal Statement" />
        </Steps>
      </div> */}

      {status === "loading" ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "42vh",
          }}
        />
      ) : (
        <>
          {/* <div style={{ padding: "30px 0px" }}>
            {activeStep === 0 && (
              <BasicInfo
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler}
                setFileList={setFileList}
                fileList={fileList}
              />
            )}
            {activeStep === 1 && (
              <BusinessDetails
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler}
                setFileList={setFileList}
                fileList={fileList}
              />
            )}
            {activeStep === 2 && (
              <EducationTraining
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler}
                setFileList={setFileList}
                fileList={fileList}
              />
            )}
            {activeStep === 3 && <ProfessionalExperience />}
            {activeStep === 4 && <Specialties />}
            {activeStep === 5 && <PersonalStatement />}
          </div> */}

          <div style={{ padding: "30px 0px" }}>
            <div>
              <BasicInfo
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler}
                setFileList={setFileList}
                fileList={fileList}
              />
            </div>
            <div className={`mt-4`}>
              <BusinessDetails
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler}
                setFileList={setFileList}
                fileList={fileList}
              />
            </div>
            <div className={`mt-4`}>
              <EducationTraining
                user={user}
                isLoading={isLoading}
                updateHandler={updateHandler}
                setFileList={setFileList}
                fileList={fileList}
              />
            </div>
            <div className={`mt-4`}>
              <ProfessionalExperience />
            </div>
            <div className={`mt-4`}>
              <Specialties />
            </div>
            <div className={`mt-4`}>
              <PersonalStatement />
            </div>
          </div>

          {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
          {/* <Button type="primary">Save</Button> */}
          {/* </div> */}
        </>
      )}
    </Card>
  );
};

export default Profile;
