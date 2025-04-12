import React from "react";

const PageTitle = () => {
  return (
    <div className="text-center mb-4 mt-5">
      <h2 className="fw-bold">
        <span
          style={{
            color: "#0071BC",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          CONTACT US
        </span>{" "}
        <span
          style={{
            color: "#0071BC",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          - Welcome to{" "}
        </span>
        <span
          style={{
            color: "#F7A5F9",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Teledental
        </span>
      </h2>
      <p
        className="text-muted"
        style={{
          color: "#375077",
          fontWeight: 400,
          fontSize: "1.2rem",
          fontFamily: "'Inter', sans-serif",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        We welcome your feedback! Patients, dental professionals, and companies
        wanting to work with <br></br> us can message us below.
      </p>
    </div>
  );
};

export default PageTitle;
