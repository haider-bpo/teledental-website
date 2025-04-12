import React from "react";

const InfoSection = () => {
  return (
    <section
      className="py-5 text-center"
      style={{
        backgroundColor: "#0071BC",
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <span style={{ fontSize: "1.2rem" }}>We are a </span>
            <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>
              trusted virtual dental care solution for both patients and
              dentists.
            </span>
            <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
              Our platform,{" "}
              <span style={{ fontWeight: 700 }}>Teledental.com</span>
              {" and "}
              <span style={{ fontWeight: 700 }}>Teledental app</span> provides
              live video dental care suggestions or live teledentist
              consultation to patients, while also enabling dental practices to
              offer Teledental services to their patients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
