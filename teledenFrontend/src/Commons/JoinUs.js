import { Button, Form } from "antd";
import React from "react";
import styles from "./ContactUs/ContactUs.module.css";
import Header from "./Header";

const JoinUs = () => {
  return (
    <div>
      <Header />
      <section
        className="container contact-us-wrapper signup-page-wrapper pt-96 px-3"
        style={{ maxWidth: "900px" }}
      >
        <h2>Join Us and Grow With Us @ Teledental</h2>
        <p>
          We are helping dentists grow, dental practices thrive with new
          technologies, adding dentists and dental professionals to our team,
          partnering with dental companies & accredited investors and health
          care groups.
        </p>
        <h4>
          BEST VIRTUAL DENTAL CARE SERVICES @ TELEDENTAL.COM AND TELEDENTAL APP.
        </h4>
        <p>
          By joining us at Teledental.com - you are joining a powerful dental
          ecosystem of dental platforms.
        </p>
        <p>
          Please fill this form to get more information on how we can help your
          dental practice grow, join us at a teledental dentist, or partner with
          us:
        </p>
        <form className="ant-form ant-form-vertical Contact-us-form">
          <h4 className={`mb-4 text-center ${styles.h2}`}>
            Do you have a question for us? Want to work with us? Are you an
            accredited investor and want to invest with us? Are you a dentist
            and want to work with us virtually at your own pace?
          </h4>
          <div className="row d-flex business- ">
            {/* <div className="col-md-12 col-lg-6 business-wrapper-edit">
              <div className="contact-wrappr-edit pt-2">
                <img src={contactbg} alt="" />
              </div>
            </div> */}
            <div className="col-sm-12 col-lg-12">
              <div className="mb-3">
                <div className="form-group">
                  <label className={`mb-2 ${styles.questionsLabel}`}>
                    Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className={`mb-2 ${styles.questionsLabel}`}>
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className={`mb-2 ${styles.questionsLabel}`}>
                    Confirm Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className={`mb-2 ${styles.questionsLabel}`}>
                    Location
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group">
                  <label className={`mb-2 ${styles.questionsLabel}`}>
                    Phone Number (optional)
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label
                  for="exampleFormControlTextarea1"
                  className={`mb-2 ${styles.questionsLabel}`}
                >
                  How can we help you (Please write):
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="Comments ..."
                ></textarea>
              </div>

              <Form.Item className="text-center w-100">
                <Button
                  className="w-25 signInButton brix---btn-primary w-button d-inline-flex justify-content-center align-items-center"
                  block
                  type="primary"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </form>
        <h3>
          We @ Teledental partner with DentalChat.com , MapDentist.com ,
          DentistList.com and many other platforms.
        </h3>
        <p>Are you a dental marketer or company? We can partner with you.</p>
        <p>
          Dental Offices / Dentists: Let us put your dental office on the map
        </p>
        <p>
          Why us? We have been innovating in the dental space for over 15 years.
        </p>
        <p>
          We can offer dentalchat chatbot, teledental, directory and marketing
          services - an all in one solution.
        </p>
        <p>Can email us at service@teledental.com for more information.</p>
        <p>
          We are at Teledental.com and Teledental app are continuing to grow.
          Teledental is a pioneer in this growing virtual dental care space.
        </p>
        <p>
          - Teledental consulting can be a great way of supporting you - Can
          email us at service@teledental.com for more information.
        </p>
        <strong>
          YOUR VIRTUAL DENTAL OFFICE MARKETING TOOL - VIRTUAL TELEDENTAL SERVICE
          AND BEST TELEDENTISTRY CONSULTING ONLINE
        </strong>
        <h3>Dentists, Professionals and Dental Companies:</h3>
        <p>
          We are looking for licensed dentists and dental professionals to work
          with us.
        </p>
        <h3>
          For Dentists, Dental Companies, Dental Insurance Groups, Dental
          Professionals and Accredited Investors - Why should I partner with
          Teledental?
        </h3>
        <ul>
          <li>
            We are looking for licensed dentists to work with us. From anywhere
            and flexible hours.
          </li>
          <li>
            Great time for dental companies and dental professionals to partner
            with us.
          </li>
          <li>
            Teledental consultation is a win for the patient and the dentis.
          </li>
          <li>No travel expense. Can be done from anywhere, at any time.</li>
          <li>Many of our patients are seeking a local dentist.</li>
          <li>
            We have people seeking dental services. Let us provide your dental
            practice with new patients.
          </li>
          <li>
            The financial value of dental telemedicine visits is expected to
            continue to grow, as Teledental technology can save patients and
            dentists time & money.
          </li>
        </ul>
        <h4>
          DENTAL MARKETING ONLINE, VIRTUAL DENTISTRY, BEST TELEDENTAL SERVICES,
          LOCAL TELEDENTISTRY CONSULTING, AND ONLINE LIVE DENTAL CARE
          CONSULTATIONS
        </h4>
        <p>
          Now more than ever, it is great to join us at Teledental. We are
          partnering with dental social media and seo companies
        </p>
      </section>
    </div>
  );
};

export default JoinUs;
