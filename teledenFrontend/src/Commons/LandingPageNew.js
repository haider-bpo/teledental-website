import React from "react";
import { useHistory } from "react-router";
import PatientSignUpModal from "../Auth/PatientSignUpModal";
import DentistSignUpModal from "../Auth/DentistSignUpModal";
import makeStyles from "@mui/styles/makeStyles";
import toothImage from "../assets/img/icon-theet.webp";
import HeroBanner from "./HeroBanner";
import appStore from "../assets/img/app-store.webp";
import playStore from "../assets/img/play-store.webp";
import SignInModal from "../Auth/SignInModal";
import Header from "./Header";
import ConnectDentist from "../Commons/ConnectDentist/ConnectDentist";
import HomeFaqs from "../Commons/HomeFaqs/HomeFaqs";
import HomeServices from "./HomeServices/HomeServices";
import HomeJoinUs from "./HomeJoinUs/HomeJoinUs";

const useStyles = makeStyles((theme) => ({
  mainLogo: {
    width: "30%",
    marginBottom: "30px",
  },
  jumbotron: {
    [theme.breakpoints.down("lg")]: {
      backgroundPosition: "75%",
    },
    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "68%",
      maxHeight: "500px",
    },
  },
  advice: {
    [theme.breakpoints.down("xl")]: {
      fontSize: "30px",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "25px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.5vw",
    },
  },
}));

function LandingPageNew() {
  const classes = useStyles();
  const featureItems = [
    "TeleDental Chat with dentists in real-time.",
    `24/7 Anytime, from any place.`,
    `Teledental care - virtual dentistry`,
    `Find dentists near you`,
  ];

  const featureItems2 = [
    "Left Teeth",
    `Common Ailments`,
    `Third Molars / Wisdom Teeth`,
    `ProblemsTooth abscessSmall`,
    `Tooth cavityLarge tooth`,
    `Cavity gum problemBreak a`,
    `ToothTooth extraction, dry socket`,
  ];

  const returnFeatureItem = (featureText, index) => {
    return (
      <div
        className={`d-flex ${
          index !== 0 ? "featureItem" : ""
        } featureItemForAll`}
        key={featureText}
      >
        <div
          className={`d-flex justify-content-center align-items-start mr-3 featureItemImg`}
        >
          <img src={toothImage} alt={`Tooth`} />
        </div>
        <div className="blue text-left text-break">{featureText}</div>
      </div>
    );
  };

  const history = useHistory();
  const [isSignInModalVisible, setIsSignInModalVisible] = React.useState(false);
  const [isVerificationModalVisible, setIsVerificationModalVisible] =
    React.useState(false);
  const [entity, setEntity] = React.useState("");

  return (
    <>
      <Header cssClass="homePage" />

      <section className="sectionOne">
        <HeroBanner />
      </section>

      <ConnectDentist />

      {/* included faq section into the home page */}
      <HomeFaqs />

      {/* included services section into the home page */}
      <HomeServices />

      {/* included Join us section into the home page */}
      <HomeJoinUs />

      <section className="uui-section_heroheader07-2">
        <div className="uui-page-padding-28">
          <div className="uui-container-large-23">
            <div className="uui-padding-vertical-xhuge-24 download-section pt-0">
              <div className="w-layout-grid uui-heroheader07_component-2">
                <div className="uui-heroheader07_image-wrapper-2"></div>
                <div className="uui-heroheader07_content-2 z-index-1 heroheader_change_order">
                  <h1 className="download_heading">
                    Checkout our Teledental App(s)
                  </h1>

                  <div className="uui-max-width-small-4">
                    <div className="uui-text-size-xlarge-17 text-color-gray200">
                      Want a Dentist Second Opinion?
                    </div>
                  </div>
                  <div className="uui-max-width-small-4">
                    <div className="uui-text-size-xlarge-17 text-color-gray200">
                      Have a Dental Question? Get Live Dentists Answers Online
                      24/7
                    </div>
                  </div>
                  <div className="uui-space-large-11"></div>
                  <div className="uui-button-row-17 is-reverse-mobile-landscape">
                    <div className="uui-button-wrapper-14 max-width-full-mobile-landscape">
                      <a
                        href="https://apps.apple.com/us/app/teledental/id1505549561"
                        target="_blank"
                        className="uui-button-26 is-button-large w-inline-block"
                      >
                        <img src={appStore} loading="lazy" alt="" />
                      </a>
                    </div>
                    <div className="uui-button-wrapper-14 max-width-full-mobile-landscape">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.app.teledental_mobile&hl=en_US"
                        target="_blank"
                        className="uui-button-26 is-button-large w-inline-block"
                      >
                        <img src={playStore} loading="lazy" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PatientSignUpModal
        isModalVisible={isSignInModalVisible === "patient"}
        setIsModalVisible={setIsSignInModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        setEntity={setEntity}
      />
      <DentistSignUpModal
        isModalVisible={isSignInModalVisible === "dentist"}
        setIsModalVisible={setIsSignInModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        setEntity={setEntity}
      />

      <SignInModal
        isModalVisible={isSignInModalVisible}
        setIsModalVisible={setIsSignInModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        setEntity={setEntity}
      />
    </>
  );
}

export default LandingPageNew;
