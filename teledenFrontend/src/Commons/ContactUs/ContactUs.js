import React from "react";
import Header from "../Header";
import styles from "./ContactUs.module.css";
// import contactbg from "../../assets/img/contactbg.jpg";
import { Form, Input, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import { contactUs } from "../../Auth/apis/authV1";
import Swal from "sweetalert2";
const ContactUs = () => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const body = {
        ...values,
        type: "contact_us",
        // location: address,
      };
      const res = await contactUs({ body });
      if (res) {
        Swal.fire({
          icon: "success",
          title:
            "Thank you for reaching us out. We'll get in touch with you shortly.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      setError("");
      setLoading(false);
      form.resetFields();
    } catch (error) {
      setLoading(false);
      setError(error.errMsg);
    }
  };
  return (
    <>
      <Header />
      <section
        className="container contact-us-wrapper signup-page-wrapper pt-96 px-3"
        style={{ maxWidth: "900px" }}
      >
        <h2 className="">Contact Us - Welcome to Teledental</h2>
        <p>
          We welcome your feedback! Patients, dental professionals and companies
          wanting to work with us can message us.
        </p>
        <h3 className="text-decoration-underline">Message Us</h3>
        {error && (
          <Alert
            style={{ marginBottom: "20px" }}
            message={error}
            type="error"
            showIcon
          />
        )}
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="ant-form ant-form-vertical Contact-us-form signup-page-wrapper"
        >
          <div className="row d-flex business- ">
            {/* <div className="col-md-12 col-lg-6 business-wrapper-edit">
              <div className="contact-wrappr-edit pt-2">
                <img src={contactbg} alt="" />
              </div>
            </div> */}
            <div className="col-sm-12 col-lg-6">
              <div className="mb-3">
                <Form.Item
                  label="Name"
                  name="name"
                  placeholder="Name"
                  rules={[
                    {
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="mb-3">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Invalid Email format!",
                    },
                    { message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="mb-3">
                <Form.Item
                  label="Confirm Email"
                  name="confirm email"
                  rules={[
                    {
                      type: "email",
                      message: "Invalid Email!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("email") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Email do not match"));
                      },
                    }),
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="mb-3">
                <Form.Item
                  label="Phone Number (Optional)"
                  name="contactNumber"
                  rules={[
                    {
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-12 col-md-12">
              <Form.Item
                label="Your current location (City, State, Country)"
                name="location"
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-sm-12 col-lg-12">
              <div class="mb-3">
                <label
                  for="exampleFormControlTextarea1"
                  className={`mb-2 ${styles.questionsLabel}`}
                >
                  Reason for inquiry (Please write):
                </label>
                <Form.Item name="comment">
                  <TextArea rows={4} placeholder="Comments ..." />
                </Form.Item>
              </div>
            </div>
            {/* <div className="col-sm-12 col-md-12 d-none">
              <Form.Item label="Type" name="type" initialValue="contact_us">
                <Input disabled />
              </Form.Item>
            </div> */}
            <Form.Item className="text-center w-100">
              <Button
                className="w-25 signInButton brix---btn-secondary w-button d-inline-flex justify-content-center align-items-center"
                block
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>

        <p>
          We are a trusted virtual dental care solution for both patients and
          dentists. Our platform,&nbsp;
          <a href="https://teledental.com/">Teledental.com </a>
          and Teledental app, provides live video dental care suggestions or
          live teledentist consultation to patients, while also enabling dental
          practices to offer Teledental services to their patients
        </p>
        <br />

        <h3>For Patients:</h3>
        <p>
          At Teledental, we are committed to meeting the growing demand for
          virtual dental care by providing you with local teledentistry
          consulting along with the information you need. However, it is
          important to note that virtual dental care cannot replace the
          necessary dental treatment you require. Therefore, we recommend
          visiting your local dentist for dental X-rays and treatment. Want to
          book a Live Virtual Dentist Consultation on Teledental?{" "}
          <Link to="/patient-signup">Click here to sign up today!</Link>
        </p>
        <h3>For Dentists and Dental Businesses:</h3>
        <div className="Dental-business">
          <ul className="dental-business-list">
            <li>Join us.</li>
            <li>Market with us.</li>
            <li>Grow with us.</li>
            <li>
              Teledental is looking to ADD Dentists and Dental professionals to
              our team.
            </li>
            <li>
              We are helping dental practices and dentists grow their business.
              What we offer no other dental marketing company can do.
            </li>
            <li>Add Teledental services to your practice.</li>
            <li>Add Dental Chatbot services to your website.</li>
            <li>Add your practice to our dental directory listings.</li>
            <li>
              Advisors and accredited investors can contact us, and grow with
              us.
            </li>
            <li>
              Dental companies and health care tech businesses can partner with
              us.
            </li>
            <li>Partnering with AI health care and telemedicine companies.</li>
            <li>Working with dental insurance companies.</li>
            <li>Dental finance companies can work with us.</li>
          </ul>
        </div>
        <p>
          Offer Your Patients a Local Dentist Consultation, A Live Dentist
          Virtual Visit, Use Teledentistry Consulting Tech and Virtual Dentistry
          Chat using Teledental Services.
        </p>
        <p>
          Visit Teledental dental sign up{" "}
          <a href="https://teledental.com/dentist-signup">
            Teledental.com/dentist-signup
          </a>
        </p>
        <p>
          We are looking to Add Dentists to our team, for local dental practices
          that are looking for new patients. Are you a dentist, dental practice,
          dental professional, dental company, AI company, telemedicine group,
          accredited investor, marketing group, social media pro or financial
          health care company? If so, then you should partner and network with
          us.
        </p>
        <p>
          Can email us at <a href="https://teledental.com">Teledental.com</a>{" "}
          for more Teledental Service and Live Teledentistry information.
        </p>

        <h3>
          AI Dental Care Chat, Virtual Teledentistry Technology, Best Dentist
          Marketing Online, Live Dentists Messaging Chatting, Local Virtual
          Dental Patient Teledentist Chat Tools and more with Teledental:
        </h3>
        <p>
          Dentists and dental professionals can join our Teledental team. Our
          Live Teledentistry Dental Patient Help Tools in real-time can help
          dental practice grow. Teledental offers unique teledental and dental
          chat technologies for your dental office. We are looking for dentists
          and dental professionals to partner with us. We welcome partnerships
          with dental companies, tech companies, and accredited investors.
        </p>
        <p>
          Are you a dentist, dental practice, dental professional, dental
          company, AI company, telemedicine group, accredited investor,
          marketing group, social media pro or financial health care company? If
          so, then you should partner and network with us.
        </p>
        <h3>Add Teledental Office Services and Partner With Us:</h3>
        <p>
          To join us or invest in what we do at Teledental.com, fill out the
          form below or contact us via email at &nbsp;
          <a href="mailto:service@teledental.com">service@teledental.com</a> for
          more information.
        </p>
        <h3>Virtual Dentistry and Tele Dental Chatting with Teledental:</h3>
        <p>
          With the advent of new technologies, people can now have a live
          virtual teledental consultation from anywhere, anytime. Teledental is
          dedicated to providing online virtual dental care with qualified
          dentists. Our consultations provide dental suggestions and information
          with live dental messaging and dental chat with dentists on DentalChat
          that may be useful for your understanding. However, we emphasize that
          you should still visit your local dentist for dental treatment and
          dental digital x-rays.
        </p>
        <h3>Teledental Service for Dental Practices:</h3>
        <p>
          We also offer Teledental services for dental practices. If you're
          interested in offering Teledental services to your patients, contact
          us for more information
        </p>
        <h3>Partner with Us:</h3>
        <p>
          If you're a dental professional or company looking to partner with us,
          this is a great time to do so. We work with{" "}
          <a href="https://dentalchat.com/">DentalChat.com</a> as well. If you
          only want to chat with a dentist, you can use DentalChat at this
          link:&nbsp;
          <a href="https://dentalchat.com/">https://dentalchat.com/</a>. To get
          in touch with us, email &nbsp;
          <a href="mailto:service@teledental.com">service@teledental.com.</a>
        </p>
        <h3>
          Live Teledentistry Consultation, Virtual Dentist Consult Chat, Live
          Dentist Question Answers and Finding Local Dentists Directory with us:
        </h3>
        <p>
          With As one of the early innovators in the Live Virtual Dentistry and
          local AI Dental Chat space - we want to help people get more dental
          information and dental suggestions. Teledental is no substitute for
          actual in-office dentistry, live dental exam and dental x-rays in your
          local dental office. Teledental can perhaps inform people on some
          things and dental information to think about.
        </p>
        <h3>
          Add Live Teledental, AI Dental Chatbot Messaging and Local Video
          Dentistry Consultation Services to Your Dental Practice
        </h3>
        <p>
          Teledental.com and DentalChat.com can help dentists grow and expand.
          Great time to partner online with us. Simply email us at &nbsp;
          <a href="mailto:service@teledental.com ">service@teledental.com </a>
          or message us on the form on top.
        </p>
        <h3>
          Listing Best Dentists, Become a Teledentist, Virtual Dentists, Live
          Dentist Teledental Service and Help People Get Live Dental Care
          Answers Online:
        </h3>
        <p>
          Did you know there are many people looking for local dentists to visit
          - to help with their dental treatment. We are helping local dentists
          and dental practices be put on the map! Best Dental Directory Listings
          Online, Providing Dental Chatbot, Virtual Teledentistry Live Video
          Technology and Get Local Dental Practice Marketing with us. Excellent
          time to partner and network online with us at Teledental.
        </p>
      </section>
    </>
  );
};

export default ContactUs;
