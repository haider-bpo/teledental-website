import React from "react";
import Header from "./Header";
import { Form, Input, Button, Alert, message, Select } from "antd";
import { contactUs } from "../Auth/apis/authV1";
import Swal from "sweetalert2";
import bannerImg from "../assets/img/aboutPage_bg.webp";
import dentisImg from "../assets/img/aboutPage_img.webp";
const { Option } = Select;

const VirtualTeleDentistry = () => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const body = {
        ...values,
        type: "virtual_tele_devtistry",
        // location: address,
      };
      const res = await contactUs({ body });
      if (res) {
        Swal.fire({
          icon: "success",
          title:
            "Please check and verify your email. We are reviewing your request, and will  get back to you shortly. Thanks",
          showConfirmButton: true,
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
    <div>
      <Header />

      <div className="vtd_top">
        <div className="vtd_banner">
          <img src={bannerImg} alt=" virtual dentistry"></img>
        </div>

        <div className="vtd_content">
          <div className="autoContent">
            <div className="vtd_flexible">
              <div className="vtd_left">
                <div>
                  <h3 className="vtd_headlines" style={{ color: "#0b5394" }}>
                    Join Our Teledental Virtual Dentists Network – Get New
                    Patient Referrals for Your Dental Office!{" "}
                  </h3>
                  <h3>Become a Part of Our Teledentistry Team Today!</h3>
                  <h3>
                    Transform Your Practice with 24/7 Virtual Dental Care and
                    Cutting-Edge Marketing Solutions.{" "}
                  </h3>
                  <p>
                    Ready to take your dental practice to the next level? At
                    Teledental.com, we're leading the way in virtual dentistry
                    with cutting-edge telehealth solutions and powerful digital
                    marketing strategies. Our platform enables licensed dentists
                    and dental professionals to provide live dental
                    consultations, engage with patients 24/7, and enhance their
                    online visibility—all while working from their own office or
                    home.
                  </p>
                  <p style={{ color: "#0b5394" }}>
                    Fill out the form below to get started!{" "}
                  </p>
                </div>

                <Form
                  form={form}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  className="ant-form ant-form-vertical Contact-us-form signup-page-wrapper"
                >
                  {error && (
                    <Alert
                      style={{ marginBottom: "20px" }}
                      message={error}
                      type="error"
                      showIcon
                    />
                  )}
                  <div className="row d-flex business- ">
                    <div className="col-sm-12 col-lg-6">
                      <div className="mb-3">
                        <Form.Item
                          style={{ color: "#0b5394" }}
                          label="NAME:"
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
                          style={{ color: "#0b5394" }}
                          label="CURRENT POSITION:"
                          name="position"
                        >
                          <Select
                            defaultValue="dentist"
                            style={{
                              fontWeight: 700,
                              height: "49px",
                              borderRadius: "4px",
                            }}
                          >
                            <Option value="dentist">I'm a dentist.</Option>
                            <Option value="dentaloffice">
                              Dentist and dental office owner.
                            </Option>
                            <Option value="proffisional">
                              Dental professional / management / owner.
                            </Option>
                            <Option value="other">Other</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                      <div className="mb-3">
                        <Form.Item
                          style={{ color: "#0b5394" }}
                          label="EMAIL:"
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
                          label="CONFIRM EMAIL:"
                          style={{ color: "#0b5394" }}
                          name="confirm email"
                          rules={[
                            {
                              type: "email",
                              message: "Invalid Email!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("email") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error("Email do not match")
                                );
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
                          label="PHONE NUMBER (Optional):"
                          style={{ color: "#0b5394" }}
                          name="contactNumber"
                          rules={[
                            {
                              message: "Please input your phone number!",
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
                          label="CITY:"
                          style={{ color: "#0b5394" }}
                          name="city"
                          placeholder="City"
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                      <div className="mb-3">
                        <Form.Item
                          label="STATE:"
                          style={{ color: "#0b5394" }}
                          name="state"
                          placeholder="State"
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlTextarea1"
                          className="mb-2 questionsLabell"
                        >
                          MESSAGE US (The reason for your inquiry):
                        </label>
                        <Form.Item name="comment">
                          <TextArea rows={4} placeholder="Message ..." />
                        </Form.Item>
                      </div>
                    </div>
                    {/* <div className="col-sm-12 col-md-12 d-none">
              <Form.Item
                label="Type"
                name="type"
                initialValue="virtual_tele_dentistry"
              >
                <Input disabled />
              </Form.Item>
            </div> */}
                    <Form.Item className="text-center w-100">
                      <Button
                        className="w-25 signInButton brix---btn-primary w-button d-inline-flex justify-content-center align-items-center"
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
              </div>
              <div className="vtd_right">
                <div className="vtd_rightImg">
                  <img src={dentisImg} alt=" dentist logo"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cosmetic-pd-wrapper footer-center-pages pt-0">
        <p>
          <h3>Why Join Teledental?</h3>
        </p>
        <p>
          <ul>
            <li>
              <b>24/7 Live Virtual Dentist Consultations:</b>
            </li>
            <p>
              Offer immediate dental consultations any time of day with our
              state-of-the-art teledentistry platform, ensuring your patients
              get the care they need—fast.
            </p>
            <li>
              <b>Advanced Digital Marketing & Exclusive Directory Listings:</b>
            </li>
            <p>
              Get unparalleled exposure through our integrated services,
              including our proprietary dental chatbot, online directories like
              DentistList.com and MapDentist.com, and strategic marketing
              campaigns designed to put your practice on the map.
            </p>
            <li>
              <b>Flexible, Remote Work Environment:</b>
            </li>
            <p>
              Enjoy the freedom to work from any location with flexible hours
              and exciting partnership packages that cater to your lifestyle and
              practice needs.
            </p>
            <li>
              <b>Proven Industry Expertise:</b>
            </li>
            <p>
              With over 15 years in the dental field, our comprehensive
              ecosystem offers trusted support and innovative solutions tailored
              to today’s digital dentistry landscape.
            </p>
          </ul>
        </p>
        <p>
          <h3>Who Should Join?</h3>
        </p>
        <p>
          <ul>
            <li>
              <b>Licensed Dentists & Dental Professionals:</b>
            </li>
            <p>
              Integrate cutting-edge teledentistry services into your practice
              and provide superior patient care with minimal overhead.
            </p>
            <li>
              <b>Dental Companies & Marketers:</b>
            </li>
            <p>
              Partner with us to amplify your brand, attract new patients, and
              harness the power of our integrated dental ecosystem.
            </p>
            <li>
              <b>Dental Insurance Groups & Accredited Investors:</b>
            </li>
            <p>
              Collaborate with an industry leader in virtual dental care and
              benefit from our innovative, growth-driven approach.
            </p>
          </ul>
        </p>
        <p>
          <h3>Ready to Elevate Your Dental Practice?</h3>
        </p>
        <p>
          Teledental.com is more than just a platform—it’s a community of
          forward-thinking dental professionals dedicated to revolutionizing
          dental care. Join us to experience the best in virtual dental care,
          live patient consultations, and advanced marketing solutions that
          drive real growth.
        </p>
        <p>
          <b>Take the Next Step:</b>
        </p>
        <p>
          Visit{" "}
          <a href="https://teledental.com/join-virtual-tele-dental-care">
            Teledental.com
          </a>{" "}
          today or email us at{" "}
          <a href="mailto:service@teledental.com">service@teledental.com</a> to
          learn how you can become a key part of the Teledental Virtual Dentists
          Team.
        </p>
        <p>
          <b>
            Next Step Best Dental Office Marketing, New Dental Patient Leads and
            Get Listed on our Local Directory Listing Online Platforms:
          </b>
        </p>
        <p>
          Teledental is much more than virtual dentistry and online dental
          consultations.{" "}
        </p>
        <p>
          Elevate your dental practice with the power of virtual dental care and
          let your expertise shine in the digital age!
        </p>
      </div>
    </div>
  );
};

export default VirtualTeleDentistry;
