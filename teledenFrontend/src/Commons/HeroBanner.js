import React from "react";
import heroBannerIcon from "../assets/img/hm_banner_img1.png";
//import heroBannerIcon from "../assets/img/hm_banner_img1_1.png";
import SignInModal from "../Auth/SignInModal";
import { Link } from "react-router-dom";
import tickIcon from "../assets/svg/arrow-right-sm-svgrepo-com.svg";
const HeroBanner = () => {
  const [isSignInModalVisible, setIsSignInModalVisible] = React.useState(false);
  const [isVerificationModalVisible, setIsVerificationModalVisible] =
    React.useState(false);
  const [entity, setEntity] = React.useState("");
  return (
    <>
      <div className="uui-page-padding-18">
        <div className="autoContent">
          <div className="uui-padding-vertical-xhuge-16">
            <div className="uui-heroheader01_component-4">
              <div
                data-w-id="4d3aaa75-92ba-ca55-d78b-6cde0f6916dc"
                className="uui-heroheader01_content-4 order_change_res"
              >
                <h1 className="uui-heading-xlarge-8 uui_heading_hero">
                  <span className="d-block">Talk with a Live Dentist on</span>  
                  <label>Teledental.com </label>

                  <small> Anywhere, 24/7</small>
                </h1>
                <div className="brix---buttons-row hero_banner_btn">
                  <div className="brix---button-row-left">
                    <Link
                      to="/patient-signup"
                      name="patient"
                      className="brix---btn-primary w-button btn-edit prim_btn_blue-fill"
                      // onClick={() => setIsSignInModalVisible(true)}
                    >
                      Start Here
                    </Link>
                  </div>
                  <Link
                    to="/contact-us"
                    className="brix---btn-primary w-button btn-edit prim_btn_blue-fill"
                  >
                    Contact Us
                  </Link>
                </div>
                <div className="uui-layout08_item-4">
                  <div className="uui-layout08_item-icon-wrapper-4">
                    <div className="uui-icon-1x1-xsmall-11 w-embed">
                      <img src={tickIcon} alt="tick icon" />
                    </div>
                  </div>
                  <div className="uui-layout08_item-text-wrapper-3">
                    <div className="uui-text-size-large-11">
                    Professional <strong>online dental consultation</strong> with virtual dentists.
                    </div>
                  </div>
                </div>
                <div className="uui-layout08_item-4">
                  <div className="uui-layout08_item-icon-wrapper-4">
                    <div className="uui-icon-1x1-xsmall-11 w-embed">
                      <img src={tickIcon} alt="tick icon" />
                    </div>
                  </div>
                  <div className="uui-layout08_item-text-wrapper-3">
                    <div className="uui-text-size-large-11">
                    Get <strong>virtual dental help</strong> and find <strong>local dentists near you</strong>. 
                    </div>
                  </div>
                </div>
                <div className="uui-layout08_item-4">
                  <div className="uui-layout08_item-icon-wrapper-4">
                    <div className="uui-icon-1x1-xsmall-11 w-embed">
                      <img src={tickIcon} alt="tick icon" />
                    </div>
                  </div>
                  <div className="uui-layout08_item-text-wrapper-3">
                    <div className="uui-text-size-large-11">
                    Schedule a <strong>live dental video consult</strong> with a Teledental dentist.  
                    </div>
                  </div>
                </div>
                <div className="uui-layout08_item-4">
                  <div className="uui-layout08_item-icon-wrapper-4">
                    <div className="uui-icon-1x1-xsmall-11 w-embed">
                      <img src={tickIcon} alt="tick icon" />
                    </div>
                  </div>
                  <div className="uui-layout08_item-text-wrapper-3">
                    <div className="uui-text-size-large-11">
                    Schedule a dental appointment.
                    </div>
                  </div>
                </div>
                
                <div className="uui-space-large-8"></div>
                <div className="brix---buttons-row hero_banner_btn">
                  <div className="brix---button-row-left">
                    <Link
                      className="brix---btn-secondary w-button prim_btn_blue-outlined"
                      // onClick={() => setIsSignInModalVisible(true)}
                      to={
                        "/patient-signup"
                      }
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
                {/* <h3 className="tagLineText">
                  Live <span>Teledental</span> <br/> Consultation
                </h3> */}
                <img
                  src={heroBannerIcon}
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
