import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      logo: "/images/person.png",
      title: "Register With Us",
      description:
        "Complete your registration with Teledental. Create a new account or log in an existing one.",
      bgImage: "/images/step-1.png",
      ellipse: "/images/ellipse.png",
    },
    {
      number: "2",
      logo: "/images/calendar.png",
      title: "Schedule Your Appointment",
      description:
        "Find a day/time that works best for you and get paired with an available dentist.",
      bgImage: "/images/step-2.png",
      ellipse: "/images/ellipse.png",
    },
    {
      number: "3",
      logo: "/images/phone.png",
      title: "Consultation with Dentist",
      description:
        "Pay for your consultation and discuss your issues with the dentist. You will receive guidance and solutions to solve your dental problems.",
      bgImage: "/images/step-1.png",
      ellipse: "/images/ellipse.png",
    },
  ];

  return (
    <>
      <section className="container contact-us-wrapper signup-page-wrapper pt-96 px-3">
        <h2 className="text-center text_blue">How It Works</h2>

        <div className="w-100 mt-5 d-flex flex-column flex-md-row gap-5 justify-content-center align-items-center">
          {steps.map((step) => (
            <Step
              key={step.number}
              logo={step.logo}
              number={step.number}
              title={step.title}
              description={step.description}
              bgImage={step.bgImage}
              ellipse={step.ellipse}
            />
          ))}
        </div>

        <div className="pt-5">
          <h3
            className={`mt-5 text-center font_piazzolla px-2 fw-medium `}
            style={{ fontSize: "1.7rem" }}
          >
            Experience an online dental consultation that will leave you smiling
            from home.
          </h3>

          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
            <div>
              <Link
                className="btn pink_btn "
                to={"#"}
              >
                Find Out More
              </Link>
            </div>
            <div>
              <Link
                className="btn blue_outline_btn "
                to={"#"}
              >
                Start Your Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;

function Step({ logo, number, title, description, bgImage, ellipse }) {
  return (
    <div
      className="d-flex flex-column py-5 align-items-center justify-content-around text-center p-4 position-relative step-card"
      style={{
        width: "388px",
        height: "388px",
        background: `url(${bgImage}) no-repeat center center`,
        backgroundSize: "contain",
      }}
    >
      {/* logo */}
      <div
        style={{
          width: "60px",
          height: "65px",
          backgroundSize: "contain",
        }}
      >
        <img src={logo} alt="logo" className="w-100 h-100" />
      </div>

      {/* title and Description  */}
      <div className="mt mb-4">
        <p
          className={`mb-3 heading_styles ${
            number === "2" ? "text_blue" : "text-white"
          }`}
        >
          {title}
        </p>
        <p
          className={`mb-0 font_piazzolla px-2 fw-medium ${
            number === "2" ? "text-black" : "text-white"
          }`}
        >
          {description}
        </p>
      </div>

      {/* step number */}
      <div
        className="position-absolute d-flex justify-content-center align-items-center"
        style={{
          bottom: "-40px",
          width: "80px",
          height: "80px",
          background: `url(${ellipse}) no-repeat center center`,
          backgroundSize: "contain",
        }}
      >
        <span className="fw-bold fs-4 text_blue">{number}</span>
      </div>
    </div>
  );
}
