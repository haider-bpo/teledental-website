import React from "react";
import Header from "../Header";
import { Col, Row } from "react-bootstrap";
import logo from "../../assets/img/TeleDental-web.png";
import { Link } from "react-router-dom";
import "./style.css";

function BestDentistPromo() {
  return (
    <div>
      <Header />
      <div id="main-wrapper">
        <div className="header">
          <div className="main-heading">Teledental | DentalChat | <br />New Leads | SEO and<br /> more</div>
          <div className="secondary-heading">
            <span className="secondary-text">
              <strong>
                #1 Dental Ecosystem that no other can match
              </strong>
            </span>
            <div>
              <span className="secondary-text">
                15 years building tech innovation
              </span>
            </div>
            <span className="secondary-text">
              <strong>
                With the best low prices in one place
              </strong>
            </span>
          </div>
        </div>
        <div className="middle-section">
          <Row>
            <p className="middle-section-heading">Easy as 1-2-3 and much more</p>
            <Col xs={12} md={4}>
              <ol>
                <li>Get Dental Chatbot into your website</li>
                <li>Add Teledental Services to your practice</li>
                <li>Multiple directory listings {'>'} Best SEO</li>
              </ol>
            </Col>
            <Col>
              <Link to="/" className="n_signup_logo">
                <img
                  width={300}
                  src={logo}
                  alt="TeleDental"
                />
              </Link>
            </Col>
          </Row>
          <Row>
            <p className="middle-section-heading">Our partner platforms:</p>
            <span className="sitemap">
              Teledental.com {">"} Dentalchat.com {">"} DentistList.com {">"} MapDentist.com {">"} and many others
            </span>
            <Col>
              <ul>
                <li>Connect with patients virtually</li>
                <li>Get listed on dentist listing directories</li>
                <li>Higher Google Ranking and Conversion</li>
                <li>Review Management Dashboard</li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>Keyword Ranking</li>
                <li>Custom Website SEO</li>
                <li>Reporting and Support</li>
              </ul>
            </Col>
          </Row>
        </div>
        <div className="packages-list">
          <span className="packages-heading">Affordable Packages</span>
          <Row className="mt-2">
            <Col xs={12} md={4} className="mb-3">
              <div className="package-card">
                <div className="package-card-name">Pro</div>
                <div className="package-description">
                  <span>Platforms</span><br />
                  <span>No SEO</span>
                </div>
                <div><span className="package-price">$549</span>mo</div>
                <p>$499 / 6 months</p>
                <p><strong> $388 / yearly </strong></p>
              </div>
            </Col>
            <Col xs={12} md={4} className="mb-3">
              <div className="package-card premium">
                <div className="package-card-name premium">Premium</div>
                <div className="package-description">
                  <span>Platforms & SEO</span>
                </div>
                <div><span className="package-price">$1799</span>mo</div>
                <p>$1699 / 6 months</p>
                <p><strong> $1488 / yearly </strong></p>
              </div>
            </Col>
            <Col xs={12} md={4} className="mb-3">
              <div className="package-card">
                <div className="package-card-name">Platinum</div>
                <div className="package-description">
                  <span>Platforms & SEO and more</span>
                </div>
                <div><span className="package-price">$2199</span>mo</div>
                <p>$1999 / 6 months</p>
                <p><strong> $1788 / yearly </strong></p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="contact">
          <span>
            <strong>Contact us at:</strong>&nbsp;
            service@teledental.com or service@dentalchat.com
          </span>
        </div>
      </div>
    </div>
  );
}

export default BestDentistPromo;
