import { Button } from "antd";
import React, { useState } from "react";
import Experience from "../Commons/Experience";

const ProfessionalExperience = () => {
  const [professionalExperience, setProfessionalExperience] = useState([
    {
      jobTitle: "",
      employerName: "",
      location: "",
      startDate: "",
      endDate: "",
      isPresent: false,
    },
  ]);
  return (
    <div>
      {professionalExperience?.map((experienceObj, index) => (
        <div key={index}>
          <Experience setProfessionalExperience={setProfessionalExperience} />
          {index === professionalExperience.length - 1 ? (
            <Button
              onClick={() =>
                setProfessionalExperience([
                  ...professionalExperience,
                  {
                    jobTitle: "",
                    employerName: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    isPresent: false,
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
                const tempArr = professionalExperience;
                tempArr.splice(index, 1);
                setProfessionalExperience([...tempArr]);
              }}
              style={{ margin: "20px 0px" }}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfessionalExperience;
