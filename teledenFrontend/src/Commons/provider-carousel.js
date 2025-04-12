import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const ProviderCarousel = () => {
  return (
    <div class="py-5" style={{ backgroundColor: "#375077" }}>
      <div class="row pt-3">
        <div class="col-lg-9 mx-auto">
          <h2 className="carosel_title text-center">
            Join <span>Teledental</span> as a <span>Dentist</span>
          </h2>
          <p className="carosel_subtitle p-0">Become a Virtual Provider</p>

          <p className="carosel_keywords">
            Expand your reach <span className="d-none d-md-inline">|</span> Grow
            your practice <span className="d-none d-md-inline">|</span> Deliver
            virtual care
          </p>
          <div id="myCarousel" class="carousel slide" data-ride="carousel">
            {/* Carousel indicators */}
            <ol class="carousel-indicators">
              <li
                data-target="#myCarousel"
                data-slide-to="0"
                class="active"
                style={{ backgroundColor: "#fff" }}
              ></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            {/* Wrapper for carousel items */}
            <div class="carousel-inner">
              <div class="carousel-item active">
                <Row className="carosel_card">
                  {/* Left Column - Image */}
                  <Col md={6} className="mb-4 mb-md-0 py-5">
                    <img
                      src="/images/carosel-card-1.png"
                      alt="Dental Guidance"
                      className="img-fluid rounded-3"
                    />
                  </Col>

                  {/* Right Column - Content */}
                  <Col md={5} className="py-5">
                    <h1 className="mb-4 title">
                      Join the <span>Teledental.com</span> Team!
                    </h1>
                    <p
                      className={`font_piazzolla px-2 fw-medium`}
                      style={{ fontSize: "1.3rem" }}
                    >
                      <ul className="text-start ps-4">
                        <li>As a Teledental Dentist.</li>
                        <li>Let us help market your dental practice.</li>
                      </ul>
                    </p>
                    <div className="text-start ps-md-4">
                      <button size="lg" className="btn blue_btn mt-5">
                        Book Now
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>

              <div class="carousel-item">
                <Row className="carosel_card">
                  {/* Left Column - Image */}
                  <Col md={5} className="mb-4 mb-md-0 py-5">
                    <img
                      src="/images/carosel-card-2.png"
                      alt="Dental Guidance"
                      className="img-fluid rounded-3"
                    />
                  </Col>

                  {/* Right Column - Content */}
                  <Col md={7} className="py-5">
                    <h1 className="mb-4 title text-start">
                      <span>Partner With Us</span>
                    </h1>
                    <p className="mb-4 title text-start">
                      Let’s <span>collaborate</span> and{" "}
                      <span>revolutionize</span> dental care.
                    </p>
                    {/* <p
                      className={`font_piazzolla px-2 fw-medium`}
                      style={{ fontSize: "1.3rem" }}
                    >
                      <ul className="text-start ps-4">
                        <li>As a Teledental Dentist.</li>
                        <li>Let us help market your dental practice.</li>
                      </ul>
                    </p> */}
                    <div className="text-start">
                      <button size="lg" className="btn blue_btn mt-5">
                        Register as Dentist
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="carousel-item">
                <Row className="carosel_card">
                  {/* Left Column - Image */}
                  <Col md={5} className="mb-4 mb-md-0 py-5">
                    <img
                      src="/images/carosel-card-3.png"
                      alt="Dental Guidance"
                      className="img-fluid rounded-3"
                    />
                  </Col>

                  {/* Right Column - Content */}
                  <Col md={7} className="py-5">
                    <h1 className="mb-4 title text-start">
                      <span>Add Teledental to Your Practice</span>
                    </h1>
                    <p className="mb-4 title text-start">
                      Grow your dental practice by offering{" "}
                      <span>virtual consultations.</span>
                    </p>
                    {/* <p
                      className={`font_piazzolla px-2 fw-medium`}
                      style={{ fontSize: "1.3rem" }}
                    >
                      <ul className="text-start ps-4">
                        <li>As a Teledental Dentist.</li>
                        <li>Let us help market your dental practice.</li>
                      </ul>
                    </p> */}
                    <div className="text-start">
                      <button size="lg" className="btn blue_btn mt-5">
                        Register as Dentist
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            {/* Carousel controls */}
            {/* <a
              class="carousel-control-prev"
              href="#myCarousel"
              data-slide="prev"
            >
              <i class="fa fa-angle-left"></i>
            </a>
            <a
              class="carousel-control-next"
              href="#myCarousel"
              data-slide="next"
            >
              <i class="fa fa-angle-right"></i>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCarousel;
