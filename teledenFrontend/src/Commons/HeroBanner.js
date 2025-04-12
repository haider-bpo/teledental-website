import React from "react";
import SignInModal from "../Auth/SignInModal";
import { Link } from "react-router-dom";
const HeroBanner = () => {
  const [isSignInModalVisible, setIsSignInModalVisible] = React.useState(false);
  const [isVerificationModalVisible, setIsVerificationModalVisible] =
    React.useState(false);
  const [entity, setEntity] = React.useState("");
  return (
    <>
      <div
        className="uui-page-padding-18"
        style={{
          backgroundImage: "url('/images/hero-banner-bg-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="autoContent">
          <div className="uui-padding-vertical-xhuge-16">
            <div className="uui-heroheader01_component-4">
              <div
                data-w-id="4d3aaa75-92ba-ca55-d78b-6cde0f6916dc"
                className="uui-heroheader01_content-4 order_change_res"
              >
                <h1 className="uui-heading-xlarge-8 uui_heading_hero">
                  <span>Talk with a Live Dentist on</span>
                  <label className="d-inline">Teledental.com </label>

                  <small> Anywhere, 24/7</small>
                </h1>

                <div className="uui-space-large-8"></div>
                <div className="brix---buttons-row hero_banner_btn">
                  <div className="brix---button-row-left">
                    <Link
                      className="brix---btn-secondary w-button prim_btn_blue-outlined"
                      // onClick={() => setIsSignInModalVisible(true)}
                      to={"/book-appointment"}
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
              <div
                data-w-id="4d3aaa75-92ba-ca55-d78b-6cde0f6916ee"
                className="uui-heroheader01_image-wrapper-4"
                data-aos="fade-left"
                // data-aos-duration="500"
              >
                <h3 className="tagLineText">
                  Live <span>Teledental</span> Consultation
                </h3>
                <img
                  src={"/images/banner-dentist.png"}
                  loading="lazy"
                  alt="Header image"
                  className="uui-heroheader01_image-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignInModal
        isModalVisible={isSignInModalVisible}
        setIsModalVisible={setIsSignInModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        setEntity={setEntity}
      />
    </>
  );
};

export default HeroBanner;
