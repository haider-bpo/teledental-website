import { useLocation } from "react-router";
import DentistSignUpModal from "../Auth/DentistSignUpModal";
import React from "react";
import whiteLogo from "../assets/img/white-Text-logo.webp";
import { Link } from "react-router-dom";
function Footer() {
  const location = useLocation();
  const [isSignUpModalVisible, setIsSignUpModalVisible] = React.useState("");
  const [isVerificationModalVisible, setIsVerificationModalVisible] =
    React.useState(false);
  const [entity, setEntity] = React.useState("");

  return (
    <footer
      style={{
        display:
          location.pathname.includes("messages") ||
          location.pathname.includes("verification-success")
            ? "none"
            : "block",
      }}
    >
      <footer className="combine-footer3_component">
        <div className="combine-padding-global-8">
          <div className="combine-container-large-5 combine-container-edit">
            <div className="combine-padding-section-medium-7 ">
              <div className="combine-footer3_top footer-top-edit">
                <div className="combine-footer3_nav-menu footer-center-edit">
                  <Link
                    to={"/"}
                    className="combine-footer3_logo-link w-inline-block"
                  >
                    <img
                      src={whiteLogo}
                      loading="lazy"
                      // sizes="(max-width: 479px) 45vw, (max-width: 767px) 25vw, 193.0078125px"
                      // srcset="images/white-Text-logo-p-500.webp 500w, images/white-Text-logo.webp 571w"
                      alt="white logo"
                      className="combine-footer3_logo-vertical"
                    />
                  </Link>
                  <Link to={"/"} className="combine-footer3_link">
                    Home
                  </Link>
                  <Link
                    to={"/best-live-dentist-video-about-us "}
                    className="combine-footer3_link"
                  >
                    About Us
                  </Link>
                  <Link to={"/contact-us"} className="combine-footer3_link">
                    Contact Us
                  </Link>
                  <Link to={"/faqs-question"} className="combine-footer3_link">
                    FAQ
                  </Link>
                  <Link to={"/sitemap"} className="combine-footer3_link">
                    Sitemap
                  </Link>
                </div>
                <div className="combine-footer3_social-links">
                  <a
                    href="https://twitter.com"
                    className="combine-footer3_social-link w-inline-block"
                  >
                    <div className="combine-social_icon-2 w-embed">
                      <svg
                        width="currentWidth"
                        height="currentHeight"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.6287 6.3652C20.9165 6.68171 20.1494 6.89488 19.3452 6.99177C20.1672 6.49923 20.7954 5.72086 21.0941 4.79229C20.3254 5.24769 19.4744 5.57875 18.5684 5.75638C17.845 4.98285 16.8098 4.5 15.6681 4.5C13.1004 4.5 11.2142 6.89488 11.794 9.38181C8.49154 9.21547 5.56052 7.63288 3.60005 5.22831C2.55844 7.01438 3.06067 9.35274 4.83059 10.5365C4.17979 10.5155 3.56775 10.3362 3.03161 10.0391C2.988 11.88 4.30898 13.6031 6.22101 13.9875C5.66226 14.1393 5.0486 14.1748 4.42525 14.0553C4.93071 15.6347 6.40188 16.7828 8.1395 16.8151C6.46486 18.1264 4.36066 18.7126 2.25 18.4639C4.01023 19.5927 6.09828 20.25 8.34297 20.25C15.7262 20.25 19.8959 14.0149 19.644 8.42256C20.4223 7.86381 21.0957 7.16295 21.6287 6.3652Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-layout-grid grid">
                <div className="uui-footer03_link-list">
                  <Link
                    to={
                      "/cosmetic-teledental-dentistry-teledentistry-treatment-information"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Cosmetic Dentistry Information</li>
                  </Link>
                  <Link
                    to={
                      "/local-dental-emergencies-teledental-common-dental-problems-consult"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Common Local Dental Emergencies</li>
                  </Link>
                  <Link
                    to={
                      "/local-gingivitis-teledental-periodontal-information-periodontist-consult"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Gingivitis and Periodontal Information</li>
                  </Link>
                  <Link
                    to={
                      "/best-teledental-care-local-teledentist-office-information"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Best Teledental Care, Teledentistry Information</li>
                  </Link>
                  <Link
                    to={
                      "/local-teledentistry-dental-crown-info-online-teledental-crowns-information"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Dental Crown Information, Dental Veneers Discussion</li>
                  </Link>
                  <Link
                    to={
                      "/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Teledental Dental Implant Information</li>
                  </Link>
                  <Link
                    target="_blank"
                    to={"/live-teledental-orthodontics-virtual-consult"}
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Orthodontics and clear aligners</li>
                  </Link>
                  <Link
                    target="_blank"
                    to={"/live-dentist-ai-teledental"}
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Teledental and AI Dental Care</li>
                  </Link>
                  <Link
                    target="_blank"
                    to={"/virtual-tooth-cavity-teledental"}
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Tooth Cavity</li>
                  </Link>
                  <Link
                    target="_blank"
                    to={"/sleep-wellness-virtual-dental-care"}
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Sleep Wellness Virtual Dental Care</li>
                  </Link>
                </div>
                <div className="uui-footer03_link-list">
                  <Link
                    to={
                      "/best-teeth-whitening-question-dentist-teledental-dental-veneers-info"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li className="text-block-5">
                      Teeth Whitening and Dental Veneers
                    </li>
                  </Link>
                  <Link
                    to={
                      "/local-teledental-stem-cells-dentistry-care-information"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Dental Stem Cell</li>
                  </Link>
                  <Link
                    to={
                      "/cosmetic-teledental-dentistry-teledentistry-treatment-information"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Cosmetic Dentistry</li>
                  </Link>
                  <Link
                    to={
                      "/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Dental Implants</li>
                  </Link>
                  <Link
                    to={"/tooth-fracture-consult"}
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Tooth Fracture Information</li>
                  </Link>
                  <Link
                    to={
                      "/local-periodontal-questions-about-gum-disease-and-dental-bone-graft-treatment"
                    }
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>
                      Local Periodontal Questions about Gum Disease and Dental
                      Bone Graft Treatment
                    </li>
                  </Link>
                  <Link
                    target="_blank"
                    to={"/virtual-teledental-root-canal-treatment-info"}
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Root canal treatment</li>
                  </Link>
                  <Link
                    target="_blank"
                    to={"/teeth-sensitivity-and-teledental-sensitive-tooth"}
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Teeth Sensitivity and Teledental Sensitive Tooth</li>
                  </Link>
                  <Link
                    target="_blank"
                    to={"/dental-implant-information"}
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>Live Dental Implant Questions and Information</li>
                  </Link>
                  <Link
                    target="_blank"
                    to={"/dental-insurance"}
                    className="uui-footer03_link w-inline-block"
                  >
                    <li>
                      Local Dental Insurance and Dental Plan Teledental Info
                    </li>
                  </Link>
                </div>
              </div>
            </div>
            <div className="">
              <div className="combine-footer3_bottom">
                <div className="combine-footer3_bottom-text-withoutLC">
                  © 2025 copyright teledental. All rights reserved.
                </div>
                <div
                  className="combine-footer3_nav-menu combine-footer3_nav-menu-2"
                  style={{ marginRight: "80px" }}
                >
                  <a href="#" className="combine-footer3_link">
                    Cookies
                  </a>
                  <Link
                    to="/terms-and-conditions"
                    className="combine-footer3_link"
                  >
                    Terms
                  </Link>
                  <Link
                    to="/privacy-policy-teledental"
                    className="combine-footer3_link"
                  >
                    Privacy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <div className="container-fluid footerWrapper sectionTopMargin">
        <div className="row">
          <div className="col-md-3">
            <ul className="footerMenu menuOne">
              <li
                className="footerMenuitem link"
                onClick={() => history.push("/")}
              >
                &#8226; Home
              </li>
              <li
                className="footerMenuitem link"
                onClick={() => history.push("/best-live-dentist-video-about-us ")}
              >
                &#8226; About us
              </li>
              <li
                className="footerMenuitem link"
                onClick={() => history.push("/sitemap")}
              >
                &#8226; Sitemap
              </li>
           
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="footerMenu">
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/cosmetic-teledental-dentistry-teledentistry-treatment-information"
                  )
                }
              >
                &#8226; Cosmetic Dentistry Information
              </li>
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/local-dental-emergencies-teledental-common-dental-problems-consult"
                  )
                }
              >
                &#8226; Common Local Dental Emergencies
              </li>
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/local-gingivitis-teledental-periodontal-information-periodontist-consult"
                  )
                }
              >
                &#8226; Gingivitis and Periodontal Information
              </li>
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/best-teledental-care-local-teledentist-office-information"
                  )
                }
              >
                &#8226; Best Teledental Care, Teledentistry Information
              </li>
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/local-teledentistry-dental-crown-info-online-teledental-crowns-information"
                  )
                }
              >
                &#8226; Dental Crown Information, Dental Veneers Discussion
              </li>
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers"
                  )
                }
              >
                &#8226; Teledental Dental Implant Information
              </li>
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/best-teeth-whitening-question-dentist-teledental-dental-veneers-info"
                  )
                }
              >
                &#8226; Teeth Whitening and Dental Veneers
              </li>
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/local-teledental-stem-cells-dentistry-care-information"
                  )
                }
              >
                &#8226; Dental Stem Cell
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="footerMenu">
            
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/cosmetic-teledental-dentistry-teledentistry-treatment-information"
                  )
                }
              >
                &#8226; Cosmetic Dentistry
              </li>
              <li
                className="footerMenuitem link"
                onClick={() =>
                  history.push(
                    "/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers"
                  )
                }
              >
                &#8226; Dental Implants
              </li>
           
            </ul>
          </div>
          <div className="col-md-3 widgetFour d-flex justify-content-center align-items-md-start">
            <div className="QECWrapper">
              <div className="qecItem">
                <p className="qectext">Are you a top Dentist ?</p>
                <a
                  className="qecbtn"
                  href="#"
                  onClick={() => setIsSignUpModalVisible("dentist")}
                >
                  Join TeleDental
                </a>
              </div>
              <div className="qecItem">
                <p className="qectext">Have a Dental Question ?</p>
                <a className="qecbtn" href="#">
                  Chat with Dentist
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container-fluid copyRightfooterWrapper">
        <div className="row">
          <div
            className="flex flex-column col-lg-4 verticalCenter"
            style={{
              justifyContent: "space-around",
            }}
          >
            <div className="flex flex-column flex-sm-row w-100">
              <div className="text-center">
                <label
                  className="smalltext mb-0 gadugiBold text-uppercase white link"
                  onClick={() => history.push("/privacy-policy-teledental")}
                >
                  Privacy Policy
                </label>
              </div>
              <div className="text-center">
                <label
                  onClick={() => history.push("/terms-and-conditions")}
                  className="smalltext mb-0 gadugiBold text-uppercase white link"
                >
                  Terms and Conditions
                </label>
              </div>
            </div>
            <div className="mt-3">
              <label className="smalltext mb-0 gadugiBold text-uppercase white text-center">
                Copyright Teledental. All rights reserved
              </label>
            </div>
          </div>
          
          <div className=" d-flex flex-column justify-content-center col-lg-4 mt-3">
            <div className="d-flex justify-content-center">
              <img
                className="footer_shareItem"
                src="/assets/img/app-store.webp"
                alt="app-store button to download the ios app"
                style={{ backgroundColor: "white", borderRadius: `4.5px` }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <img
                className="footer_shareItem play-store-btn"
                src="/assets/img/play-store.webp"
                alt="play-store button to download the android app"
              />
            </div>
          </div>
          <div className="col-lg-4 verticalCenter">
            <ul className="socialWrappper">
              <li className="socialItem">
                <a href="#">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="socialItem">
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              <li className="socialItem">
                <a href="#">
                  <i className="fa fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
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
