import React, { useState } from "react";
import Education from "../Commons/Education";
import { Button, Col, Divider, Form, Input } from "antd";

const EducationTraining = ({
  user,
  isLoading,
  updateHandler,
  setFileList,
  fileList,
}) => {
  const [education, setEducation] = useState(
    user?.education?.length
      ? user.education.map((education) => ({
          degree: "",
          year: "",
          schoolName: "",
          schoolLocation: "",
          image: null,
        }))
      : [
          {
            degree: "",
            year: "",
            schoolName: "",
            schoolLocation: "",
            image: null,
          },
        ]
  );
  const [awards, setAwards] = useState(
    user?.awards.length ? user.awards.map((_) => "") : [""]
  );
  const [insurances, setInsurances] = useState(
    user?.insurances.length ? user.insurances.map((_) => "") : [""]
  );

  function updateHandlerWrapper(payload) {
    updateHandler(payload, "educationCertificate");
  }

  return (
    <div>
      <Form layout="vertical" onFinish={updateHandlerWrapper}>
        {education?.map((educationObj, index) => (
          <div key={index}>
            <Education
              user={user}
              form={Form}
              setFileList={setFileList}
              fileList={fileList}
              setEducation={setEducation}
              index={index}
            />
            {index === education.length - 1 ? (
              <Button
                onClick={() =>
                  setEducation([
                    ...education,
                    {
                      degree: "",
                      year: "",
                      schoolName: "",
                      schoolLocation: "",
                      image: null,
                    },
                  ])
                }
                style={{ margin: "20px 0px" }}
              >
                Add More
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const tempArr = education;
                  tempArr.splice(index, 1);
                  setEducation([...tempArr]);
                }}
                style={{ margin: "20px 0px" }}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Divider />
        <div
          style={{ gap: "20px" }}
          className={`d-flex flex-column flex-md-row w-100`}
        >
          <Col className={`width50ForForItems`}>
            {awards?.map((award, index) => (
              <>
                <Form.Item
                  label="Awards and Publications"
                  // style={{ width: "50%" }}
                  name={["awards", index]}
                  initialValue={user?.awards?.[index]}
                  key={index}
                  className={`w-100`}
                >
                  <Input placeholder="input placeholder" />
                </Form.Item>
                {index === awards.length - 1 ? (
                  <Button
                    onClick={() => setAwards([...awards, ""])}
                    style={{ margin: "10px 0px" }}
                  >
                    Add More
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      const tempArr = awards;
                      tempArr.splice(index, 1);
                      setAwards([...tempArr]);
                    }}
                    style={{ margin: "10px 0px" }}
                  >
                    Remove
                  </Button>
                )}
              </>
            ))}
          </Col>
          <Col className={`width50ForForItems`}>
            {insurances?.map((insurance, index) => (
              <>
                <Form.Item
                  label="In Network Insurance"
                  // style={{ width: "50%" }}
                  name={["insurances", index]}
                  initialValue={user?.insurances?.[index]}
                  key={index}
                  className={`w-100`}
                >
                  <Input placeholder="input placeholder" />
                </Form.Item>
                {index === insurances.length - 1 ? (
                  <Button
                    onClick={() => setInsurances([...insurances, ""])}
                    style={{ margin: "10px 0px" }}
                  >
                    Add More
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      const tempArr = insurances;
                      tempArr.splice(index, 1);
                      setInsurances([...tempArr]);
                    }}
                    style={{ margin: "10px 0px" }}
                  >
                    Remove
                  </Button>
                )}
              </>
            ))}
          </Col>
        </div>
        <Form.Item>
          <div className="float-right">
            <Button
              className="w-150 hover"
              type="primary"
              htmlType="submit"
              // loading={isLoading}
              size="large"
              style={{ marginTop: "10px" }}
            >
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EducationTraining;
