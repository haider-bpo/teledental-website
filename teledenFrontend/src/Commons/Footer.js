import { useLocation } from "react-router";
import DentistSignUpModal from "../Auth/DentistSignUpModal";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const [isSignUpModalVisible, setIsSignUpModalVisible] = React.useState("");
  const [isVerificationModalVisible, setIsVerificationModalVisible] =
    React.useState(false);
  const [entity, setEntity] = React.useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleStartConsultation = () => {
    // Consultation functionality would go here
    console.log("Start consultation with email:", email);
  };

  return (
    <footer
      style={{
        display:
          location.pathname.includes("messages") ||
          location.pathname.includes("verification-success")
            ? "none"
            : "block",
        backgroundColor: "#1A2433",
        color: "white",
      }}
    >
      <div className="footer-container">
        {/* Top Navigation */}
        <div className="footer-top">
          <div className="footer-logo-nav">
            <Link to={"/"}>
              <img src={"/images/logo-with-text.png"} alt="Teledental Logo" />
            </Link>

            <div className="footer-nav">
              <Link to={"/"} className="footer-nav-link">
                Home
              </Link>
              <Link to={"/contact-us"} className="footer-nav-link">
                Contact
              </Link>
              <Link to={"/join-us"} className="footer-nav-link">
                Join Us
              </Link>
              <Link to={"/faqs-question"} className="footer-nav-link">
                FAQ
              </Link>
              <Link to={"/login"} className="footer-nav-link">
                Log In
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-content">
          <div className="footer-appointment">
            <h2 className="footer-heading" style={{ fontWeight: 900 }}>
              <strong>Book Your Appointment</strong>
            </h2>
            <div className="footer-form">
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={handleEmailChange}
                className="footer-input"
              />
              <button
                className="footer-button"
                onClick={handleStartConsultation}
              >
                <strong>Start Consultation</strong>
              </button>
            </div>
          </div>

          <div className="footer-social">
            <h2 className="footer-heading-second font_piazzolla">
              FollowTeledental
            </h2>
            <div className="social-icons">
              <a href="https://facebook.com" className="social-icon">
                <div className="social-icon-circle">
                  <i className="fa fa-facebook-f"></i>
                </div>
              </a>
              <a href="https://twitter.com" className="social-icon">
                <div className="social-icon-circle">
                  <i className="fa fa-twitter"></i>
                </div>
              </a>
              <a href="https://instagram.com" className="social-icon">
                <div className="social-icon-circle">
                  <i className="fa fa-instagram"></i>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-combined-legal">
            <strong className="footer-copyright font_piazzolla">
              Copyright @ 2025 Teledental, All rights reserved{" "}
            </strong>
            <strong>|</strong>
            <a href="#" className="footer-legal-link">
              <strong>Cookies</strong>
            </a>
            <strong> | </strong>
            <Link to="/terms-and-conditions" className="footer-legal-link">
              <strong>Terms</strong>
            </Link>
            <strong> | </strong>
            <Link to="/privacy-policy-teledental" className="footer-legal-link">
              <strong>Privacy</strong>
            </Link>
          </div>
        </div>
      </div>

      <DentistSignUpModal
        isModalVisible={isSignUpModalVisible === "dentist"}
        setIsModalVisible={setIsSignUpModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        setEntity={setEntity}
      />
    </footer>
  );
}

export default Footer;
