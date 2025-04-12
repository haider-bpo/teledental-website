import React from "react";
import { Button } from "antd";

/**
 * Call-to-Action section component
 * Displayed at the bottom of the Join Us page
 */
const CtaSection = () => {
  return (
    <div className="cta-section text-center my-5">
      <span
        className=""
        style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0071BC" }}
      >
        Ready to{" "}
      </span>
      <span
        className="text-pink"
        style={{ fontSize: "1.5rem", fontWeight: 800 }}
      >
        Elevate Your Dental Practice?
      </span>

      <div className="cta-content my-4">
        <p>
          <strong>Teledental.com</strong> is a community of forward-thinking
          dental professionals dedicated to revolutionizing the dental care.
          Join us to experience the{" "}
          <strong>
            best in virtual dental care, live patient consultations
          </strong>
          , and{" "}
          <strong>advanced marketing solutions that drive real growth</strong>.
        </p>

        <p className="mt-3">
          Visit{" "}
          <a href="https://teledental.com" className="teledental-link">
            Teledental.com
          </a>{" "}
          today or email us at{" "}
          <a href="mailto:service@teledental.com" className="teledental-link">
            service@teledental.com
          </a>{" "}
          to learn how you can become a key part of the Teledental Virtual
          Dentists Team.
        </p>
      </div>

      <Button className="become-dentist-btn" type="primary">
        Become a Teledental Dentist
      </Button>
    </div>
  );
};

export default CtaSection;
