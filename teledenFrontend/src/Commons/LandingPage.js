import { useHistory } from "react-router";
import Header from "./Header";

function LandingPage() {
  const history = useHistory();
  return (
    <>
      <Header />
      <section className="sectionOne">
        <div
          className="jumbotron jumbotron-fluid"
          style={{ height: `${window.innerHeight}px` }}
        >
          <div className="container">
            <img className="logo" src="./assets/img/logo.png" alt="loading" />
            <h1 className="display-4s gadugiBold blue">
              Need Dental Advice? Like to do a <br />
              Live Video Consultation
            </h1>
            <h3 className="gadugiBold blue">Start a Teledental Consult</h3>
            <button type="button" className="btn btn-default primaryBtn">
              Get Started
            </button>
          </div>
        </div>
      </section>
      <section className="sectionTwo container">
        <div className="sectionTwo_top pb35">
          <h1 className="pink gadugiBold text-center">
            TELEDENTAL CHAT
            <br />
            WITH DENTISTS
          </h1>
          <h3 className="gadugiNormal blue text-center">
            TeleDentalChat Answers Your Dental Questions
            <br />
            And Connects You To Local Dentists.
          </h3>
        </div>
        <div className="sectionTwo_bottom">
          <h3 className="gadugiNormal grey text-center">
            Need a second opinion? Have dental concerns?
            <br />
            TeleDentalChat is helping people with their
            <br />
            dental care.
          </h3>
        </div>
      </section>
      <section className="sectionThree container-fluid">
        <div className="row verticalCenter">
          <div className="col-md-6 col-sm-12 pl-0 pr-0 featuresContainer">
            <div className="featuresWrapper">
              <ul className="list-group featureList">
                <li className="list-group-item featureItem blue verticalCenter">
                  TeleDental Chat with dentists in real-time.
                </li>
                <li className="list-group-item featureItem blue verticalCenter">
                  24/7 Anytime, from any place.
                </li>
                <li className="list-group-item featureItem blue verticalCenter">
                  Teledental care - virtual dentistry
                </li>
                <li className="list-group-item featureItem blue verticalCenter">
                  Find dentists near you
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 pr-0 featureBottom">
            <img
              className="w-100"
              src="./assets/img/section-three.jpg"
              alt="loading"
            />
          </div>
        </div>
      </section>
      <section className="sectionFour container-fluid">
        <div className="rows verticalCenter">
          <div className="col-md-7 col-sm-12">
            <div className="row vhCenter">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <img src="./assets/img/grip.jpg" alt="loading" />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <img src="./assets/img/grip.jpg" alt="loading" />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  <img src="./assets/img/grip.jpg" alt="loading" />
                </div>
              </div>
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link btn btn-default slideBtn slideNo-1 active"
                  id="v-pills-home-tab"
                  data-toggle="pill"
                  href="#v-pills-home"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Right side mouth
                </a>
                <a
                  className="nav-link btn btn-default slideBtn slideNo-1"
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  href="#v-pills-profile"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Front side mouth
                </a>
                <a
                  className="nav-link btn btn-default slideBtn slideNo-1"
                  id="v-pills-messages-tab"
                  data-toggle="pill"
                  href="#v-pills-messages"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Left side mouth
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-sm-12">
            <div className="featuresWrapper">
              <ul className="list-group featureList featureListRight">
                <li className="list-group-item featureItem blue verticalCenter">
                  Left Teeth
                </li>
                <li className="list-group-item featureItem blue verticalCenter">
                  Common Ailments
                </li>
                <li className="list-group-item featureItem blue verticalCenter">
                  Third Molars / Wisdom Teeth
                </li>
                <li className="list-group-item featureItem blue verticalCenter">
                  ProblemsTooth abscessSmall
                </li>
                <li className="list-group-item featureItem blue verticalCenter">
                  Tooth cavityLarge tooth
                </li>
                <li className="list-group-item featureItem blue verticalCenter">
                  Cavity gum problemBreak a
                </li>
                <li className="list-group-item featureItem blue verticalCenter">
                  ToothTooth extraction, dry socket
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="sectionFive bg-pink container-fluid">
        <div className="sectionFive_top text-center">
          <h3 className="innerTitle mb25">
            ARE YOU A DENTIST OR DENTAL PRACTICE? WANT MORE INFORMATION ON
            <br />
            WHAT DENTALCHAT CAN DO FOR YOUR DENTAL OFFICE?
          </h3>
          <button type="button" className="btn btn-default vanilaBtn">
            Join here
          </button>
        </div>
        <div className="sectionFive_bottom text-center">
          <img src="./assets/img/laptop.png" alt="loading" />
        </div>
      </section>
      <section className="sectionSix container-fluid">
        <div className="row">
          <div className="col-md-4 cardItem">
            <img src="./assets/img/card-01.png" alt="loading" />
            <p className="card_title mt15 darkBlue gadugiBold">
              Dental Implant
            </p>
            <label
              className="card_btn mt15 gadugiBold link"
              onClick={() =>
                history.push(
                  "/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers"
                )
              }
            >
              More
            </label>
            <p className="card_desc mt15 darkBlue">
              Dental Implants Information Best Dental Implants Dental Implants
              Information
            </p>
          </div>
          <div className="col-md-4 cardItem">
            <img src="./assets/img/card-02.png" alt="loading" />
            <p className="card_title mt15 darkBlue gadugiBold">Tooth Pain</p>
            <label
              className="card_btn mt15 gadugiBold link"
              onClick={() =>
                history.push(
                  "/local-dental-emergencies-teledental-common-dental-problems-consult"
                )
              }
            >
              More
            </label>
            <p className="card_desc mt15 darkBlue">
              Periodontitis Treatment Gum Disease Information Bleeding Gum
              Problem
            </p>
          </div>
          <div className="col-md-4 cardItem">
            <img src="./assets/img/card-03.png" alt="loading" />
            <p className="card_title mt15 darkBlue gadugiBold">
              TEETH WHITENING
            </p>
            <label
              className="card_btn mt15 gadugiBold link"
              onClick={() =>
                history.push(
                  "/best-teeth-whitening-question-dentist-teledental-dental-veneers-info"
                )
              }
            >
              More
            </label>
            <p className="card_desc mt15 darkBlue">
              Periodontitis Treatment Gum Disease Information Bleeding Gum
              Problem
            </p>
          </div>
          <div className="col-md-4 cardItem">
            <img src="./assets/img/card-04.png" alt="loading" />
            <p className="card_title mt15 darkBlue gadugiBold">
              CROWNS & BRIDGES
            </p>
            <label
              className="card_btn mt15 gadugiBold link"
              onClick={() =>
                history.push(
                  "/local-teledentistry-dental-crown-info-online-teledental-crowns-information"
                )
              }
            >
              More
            </label>
            <p className="card_desc mt15 darkBlue">
              Loose Crown Dental Crown Cosmetic Dentistry Treatment
            </p>
          </div>
          <div className="col-md-4 cardItem">
            <img src="./assets/img/card-05.png" alt="loading" />
            <p className="card_title mt15 darkBlue gadugiBold">GUM PROBLEM</p>
            <label
              className="card_btn mt15 gadugiBold link"
              onClick={() =>
                history.push(
                  "/local-gingivitis-teledental-periodontal-information-periodontist-consult"
                )
              }
            >
              More
            </label>
            <p className="card_desc mt15 darkBlue">
              Periodontitis Treatment Gum Disease Information Bleeding Gum
              Problem
            </p>
          </div>
          <div className="col-md-4 cardItem">
            <img src="./assets/img/card-06.png" alt="loading" />
            <p className="card_title mt15 darkBlue gadugiBold">
              COSMETIC DENTISTRY
            </p>
            <label
              className="card_btn mt15 gadugiBold link"
              onClick={() =>
                history.push(
                  "/cosmetic-teledental-dentistry-teledentistry-treatment-information"
                )
              }
            >
              More
            </label>
            <p className="card_desc mt15 darkBlue">
              Cosmetic Dentistry Procedures Chat - Cosmetic Dentistry Treatment
              Dental Veneers Blog
            </p>
          </div>
        </div>
      </section>
      <section className="sectionSeven container-fluid">
        <div className="row verticalCenter height100">
          <div className="col-md-8">
            <h1 className="mt15 darkBlue gadugiBold">
              DOWNLOAD OUR DENTALCHAT APP
            </h1>
            <h2>WANT A SECOND OPINION? HAVE A DENTAL QUESTION?</h2>
            <div className="sectionSeven_bottom">
              <img
                className="shareItem"
                src="./assets/img/app-store.png"
                alt="loading"
                style={{ marginRight: "5px" }}
              />
              <img
                className="shareItem"
                src="./assets/img/play-store.png"
                alt="loading"
              />
            </div>
          </div>
          <div className="col-md-4">
            <img
              className="mockupMobile"
              src="./assets/img/mobile-mockup.png"
              alt="loading"
            />
          </div>
        </div>
      </section>
      <section className="sectionEight container-fluid">
        <h1 className="text-center mt15 darkBlue gadugiBold text-uppercase">
          Need Help? Service@teledental.com
        </h1>
      </section>
    </>
  );
}

export default LandingPage;
