import Header from "../Commons/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS for carousel functionality
import AppointmentBooking from "../Commons/appointment-booking";
import GetAppSection from "../Commons/get-app-section";
import ProviderCarousel from "../Commons/provider-carousel";

const HomeDentist = () => {
  return (
    <>
      <Header />
      <div className="hero-section">
        <div className=""></div>
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="text-center text-white">
            <img
              src="/images/teledental-logo-without-text.png"
              alt="Teledental Logo"
              className="logo mb-3"
            />
            <h1 className="fw-bold display-4 text-white">
              Expand Your Online Reach
            </h1>
            <button className="btn btn-teledental mt-4 px-4 py-2 rounded-pill">
              Become a Teledental Practitioner
            </button>
          </div>
        </div>
      </div>

      <div className="bg-light py-3">
        <div className="container">
          <p className="carousel-text text-center mb-0">
            Carousel Banner: Put announcements here
          </p>
        </div>
      </div>

      <div className="custom-home-dentist-bg-primary text-white py-5">
        <div className="">
          <div className="row">
            <div className="col-lg-4 col-md-12 mb-md-4 mb-lg-0 pt-5 mt-5">
              <div className="d-flex flex-column align-items-center text-center align-items-lg-start text-lg-start ps-lg-5 pt-5 mt-5">
                <img
                  src="/images/teledental-logo-without-text.png"
                  alt="Teledental Logo"
                  className="logo-white mb-3"
                />
                <h2 className="congratulations-text display-5">
                  Consultations
                  <br />
                  With Your
                  <br />
                  Patients
                </h2>
                <button className="btn bg-white mt-4 px-4 py-2 rounded-pill consultation_btn">
                  Start Here / Register
                </button>
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              {/* Desktop version with circles - visible only on large screens */}
              <div
                className="steps-container position-relative d-none d-lg-block"
                style={{ minHeight: "650px" }}
              >
                {/* First Circle */}
                <div
                  className="step-circle step-1 position-absolute"
                  style={{
                    top: "-5%",
                    left: "5%",
                    zIndex: 1,
                  }}
                >
                  <div className="step-content text-center">
                    <h3 className="custom-home-dentist-primary-text-color step-number mb-1">
                      1
                    </h3>
                    <h3 className="custom-home-dentist-primary-text-color fw-bold mb-2">
                      Register as Dentist
                    </h3>
                    <p className="custom-home-dentist-primary-text-color step-desc mb-0">
                      Create an account and get approved by Teledental. You will
                      be able to set up your availability (days & time)
                    </p>
                  </div>
                </div>

                {/* Second Circle */}
                <div
                  className="step-circle step-2 position-absolute"
                  style={{
                    top: "40%",
                    left: "28.5%",
                    zIndex: 2,
                  }}
                >
                  <div className="step-content text-center">
                    <h3 className="step-number text-white mb-1">2</h3>
                    <h3 className="fw-bold text-white mb-2">
                      Receive Appointments
                    </h3>
                    <p className="step-desc text-white mb-0">
                      Teledental will connect you with online patients based on
                      the availability you have provided.
                    </p>
                  </div>
                </div>

                {/* Third Circle */}
                <div
                  className="step-circle step-3 position-absolute"
                  style={{ top: "10%", right: "0%", zIndex: 1 }}
                >
                  <div className="step-content text-center">
                    <h3 className="custom-home-dentist-primary-text-color step-number mb-1">
                      3
                    </h3>
                    <h3 className="custom-home-dentist-primary-text-color fw-bold mb-2">
                      Online Consultations
                      <br />
                      With Patients
                    </h3>
                    <p className="custom-home-dentist-primary-text-color step-desc mb-0">
                      Create an account and get approved by Teledental. You will
                      be able to set up your availability (days & time)
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile version - visible only on small and medium screens */}
              <div className="d-block d-lg-none py-4">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <ul className="list-unstyled mb-0">
                        <li className="d-flex align-items-center mb-3 py-2">
                          <span
                            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold me-3"
                            style={{
                              width: "36px",
                              height: "36px",
                              minWidth: "36px",
                            }}
                          >
                            <span className="text-white">1</span>
                          </span>
                          <div>
                            <h4 className="mb-1 fw-bold text-white">
                              Register as Dentist
                            </h4>
                            <p className="mb-0 text-white-50 small">
                              Create an account and set up your availability
                            </p>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mb-3 py-2">
                          <span
                            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold me-3"
                            style={{
                              width: "36px",
                              height: "36px",
                              minWidth: "36px",
                            }}
                          >
                            <span className="text-white">2</span>
                          </span>
                          <div>
                            <h4 className="mb-1 fw-bold text-white">
                              Receive Appointments
                            </h4>
                            <p className="mb-0 text-white-50 small">
                              Connect with online patients based on your
                              availability
                            </p>
                          </div>
                        </li>
                        <li className="d-flex align-items-center py-2">
                          <span
                            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold me-3"
                            style={{
                              width: "36px",
                              height: "36px",
                              minWidth: "36px",
                            }}
                          >
                            <span className="text-white">3</span>
                          </span>
                          <div>
                            <h4 className="mb-1 fw-bold text-white">
                              Online Consultations
                            </h4>
                            <p className="mb-0 text-white-50 small">
                              Conduct virtual consultations with patients
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProviderCarousel />

      <AppointmentBooking />

      <GetAppSection />
    </>
  );
};

export default HomeDentist;
