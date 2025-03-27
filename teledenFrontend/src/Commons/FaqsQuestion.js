import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { contactUs } from "../Auth/apis/authV1";
import Swal from "sweetalert2";
const FaqsQuestion = () => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const body = {
        ...values,
        type: "faqs",
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
      <section className="uui-section_faq01-2 pt-96">
        <div className="uui-page-padding-27">
          <div className="faq-question-section px-3 pb-3">
            <div className="Text-center"></div>
            <div className="">
              <h3 className="">For Patients</h3>
              <p>
                Welcome to Teledental. Here, your oral health is our priority!
                Follow these steps to get started on your Teledental
                consultation today!
              </p>
              <ul>
                <li>
                  Start by going to the patient sign-up page on Teledental.
                </li>
                <li>Fill out the form with the information requested.</li>
                <li>Book an appointment with a Teledental Dentist.</li>
                <li>
                  Make payment or insurance (if accepted). Teledental patient
                  sign-up{" "}
                  <Link to="patient-signup">
                    https://teledental.com/patient-signup
                  </Link>
                </li>
              </ul>
            </div>
            <p>
              Would you love a live virtual dentistry consultation instead?
              Don't worry; we've got you covered! We understand that you may be
              busy with work or other activities, which is why we offer live
              video dental consultations and services with qualified dentists.
              Chat virtually with dentists 24/7, from anywhere!
            </p>
            <p>
              Our services includes helping dental practices get started with
              teledental services, providing dental marketing online to dentists
              and more. Are you a dentist or a dental company that wants to
              partner with us? Contact us via email at &nbsp;
              <a href="mailto:service@teledental.com">service@teledental.com</a>
              &nbsp; today.
            </p>
            <div className="">
              <h3>
                Frequently Asked Virtual Dental Questions about Live Teledental
                Services
              </h3>

              <ul>
                <li>
                  Does a virtual Teledental consultation minimize the need for
                  treatment at my local dentist's office?
                </li>
              </ul>
              <p>
                After you consult with us and we find out that you have a tooth
                infection or a dental problem, we'll advise you to visit your
                local dentist.
              </p>
              <ul>
                <li>Are we currently providing pain medication?</li>
              </ul>
              <p>No, we do not at this time.</p>
              <li>Do we prescribe dental antibiotics?</li>
              <p>
                Yes, we do for some specific cases. However, the patient is
                responsible for any possible notice of allergic reaction, which
                is why you must indicate in the patient sign-up form if you have
                any allergies.
              </p>
              <ul>
                <li>
                  Are the Teledental fees refundable after the virtual
                  consultation?
                </li>
              </ul>
              <p>
                No, they are not refundable. We can not know whether are dental
                suggestion will be helpful or not. Anyone using our service
                should understand that there are no refunds for any
                teledentistry services provided.
              </p>
              <ul>
                <li>How long is the Teledental virtual consultation?</li>
              </ul>
              <p>
                We try to limit it to 10 minutes. The virtual dental
                consultation is to go over a specific problem, after which we
                advise you on the next steps to solve your dental problems,
                which sometimes involves you visiting your local dental clinic
                for an in-office complete dental examination and getting your
                dental imaging x-rays done.
              </p>
              <ul>
                <li>How much does the teledental consultation cost?</li>
              </ul>
              <p>
                It costs $50, and an extra $20 is charged if you need us to
                prescribe antibiotics. The cost of the prescribed antibiotics is
                not inclusive of the $20. Note, prices may change - you will see
                the new prices on the form when making payment.
              </p>
              <h3>
                Terms and Conditions of Virtual Dental Care Consulting Inquiry -
                Live Dentistry Consultation Question about Dental
                TreatmentSuggestions and Live Video Dentistry Inquiries
              </h3>
              <p>
                Anyone using Teledental.com and Teledental app must accept the
                terms and conditions, and the teledental privacy policy. Anyone
                using Teledental Video Services needs to understand the
                limitations. For instance, you as the patient will need to visit
                a local dental practice and get the required dental imaging
                x-rays & dental treatment required.
              </p>
              <p>
                Live Teledentist Consult, Online Teledental Discussion or local
                Teledentistry Inquiry is something to use as a general dental
                suggestion. Teledental suggests for people to get dental
                treatment by a licensed local dentist. Having a second opinion
                or getting some kind of dental suggestion may be very useful -
                but, as a patient you are responsible for any dental treatment
                or dental care. The patient should do their own due diligence
                and people are suggested to follow up with a local dentist
                visit. Any antibiotics suggested prescribed, the patient is
                responsible to pay for and to administer. The patient should be
                careful of any type of allergic reaction.
              </p>
              <p>
                Like to contact us? Can email us at <br></br>
                <a href="service@teledental.com"> service@teledental.com</a> for
                more teledental information.
              </p>
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
                        name="confirmEmail"
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
                        label="Phone Number (Optional)"
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
                        className="mb-2 questionsLabell"
                      >
                        Reason for inquiry (Please write):
                      </label>
                      <Form.Item name="comment">
                        <TextArea rows={4} placeholder="Comments ..." />
                      </Form.Item>
                    </div>
                  </div>

                  {/* <div className="col-sm-12 col-md-12 d-none">
                    <Form.Item label="Type" name="type" initialValue="faqs">
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
                <strong>Dentists, Professionals, and Dental Companies:</strong>
                <br />
                We are looking for licensed dentists and dental professionals to
                work with us.
              </p>
              <h3>
                For Dentists, Dental Companies, Dental Insurance Groups, Dental
                Professionals, and Accredited Investors - Why Should I Partner
                with Teledental?
              </h3>
              <ul>
                <li>
                  Teledental consultation is a new dental service that seeks to
                  proffer solutions to patients with dental problems in the
                  comfort of their homes. It's a win-win for the patient and the
                  dentist.
                </li>
                <li>
                  No travel expenses. Consultations can be done from anywhere,
                  at any time.
                </li>
                <li>
                  Provide local teledental service for your dental office
                  patients.
                </li>
                <li>
                  We'll connect you with our patients seeking a local dentist
                  for specific oral issues.
                </li>
                <li>
                  The financial value of dental telemedicine visits is expected
                  to grow, as Teledental technology can save patients and
                  dentists time & money.
                </li>
                <li>
                  Investors poured $9.4 billion into digital health startups
                  through Q3 of 2020, with an estimated $12 billion in total
                  investment by the end of the year (A 46% investment increase
                  over the previous record of $8.2 billion for 2018).
                </li>
                <li>
                  McKinsey report estimates up to $250 Billion of our annual
                  healthcare spending could eventually shift to this virtual
                  sphere. The world has become a global village, so the industry
                  will continue to grow.
                </li>
                <li>
                  We network with DentalChat.com and other platforms. Dental
                  Chat is a leading dental platform with decades of online
                  dental service experience. We provide smart dental messaging /
                  dental chat service and live teledental video consultation
                  services.
                </li>
              </ul>
              <p>
                <strong>
                  Dental Chat Question Answers and Live Dentist Messaging&nbsp;
                  <a href="https://dentalchat.com/">https://dentalchat.com/</a>
                </strong>
              </p>
              <ul>
                <li>
                  We partner with DentalChat.com, DentistList.com,
                  MapDentist.com and various other dental platforms. We have
                  millions of visitors every year on our various partner dental
                  platforms visiting us. We help people get their dental
                  questions answered and help them find local dental practices
                  to treat their ailments. But, of course, as a growing
                  technology - not all dental practices understand this or have
                  this Teledental service. We are still expanding, and please
                  have patience with us as we expand to give you the best oral
                  health care.
                </li>
                <li>
                  The COVID shutdown increased an already growing demand for
                  remote teledental services. As a result, virtual Live
                  Dentistry Consultation has increased. In addition, local
                  Teledentistry Services and Live Teledental Consulting are
                  growing, especially after the COVID pandemic.
                </li>
                <li>
                  What makes us unique is that we provide B2B and B2C services -
                  and have focused on teledental and innovative dental chat
                  technologies. Our technologies have been built over many years
                  of research and development R&D - and we are one of the
                  pioneers in the dental space. Local Teledentistry Consulting,
                  Virtual Teledental, Live Video Dental Care or Live Teledentist
                  Consultation is a growing trend, and more dental insurance
                  companies are now starting to pay for this service.
                </li>
                <li>
                  We own dentalchat.com and teledental.com - as well as dozens
                  of dental platforms developed over the last decade. Local
                  Teledentistry Services, Live Dentist Consulting or Virtual
                  Dental Care Service should be used only as a suggestion.
                  Patients are recommended to do a proper dental imaging x-rays
                  and dental examination at a local dentist practice.
                </li>
                <li>
                  Reach a wider national audience with more client leads. o No
                  expense to hire a marketing team to launch a campaign for your
                  business dental practice.
                </li>
                <li>
                  Growing Virtual Urgent Dentistry and Live Emergency Dental
                  Care Consultation Online with Teledental and Teledentistry
                  Services. Patients with dental information or dental questions
                  - can ask with a live virtual dentistry video messaging tool.
                </li>
                <li>
                  Partner with Teledental.com, the Teledental app, and our other
                  platforms. Contact us at service@teledental.com for more
                  information.
                </li>
                <li>
                  Want to work with us, invest, or partner with us? Get in on
                  the ground floor! A partnership with Teledental gives you and
                  your business a percentage of revenue. Your revenue earnings
                  depend on the amount you contribute to this project. Dental
                  Partnering mutually helps and promotes one another!
                </li>
                <li>
                  We look to the future and are interested in long-term
                  relationships. You're partnering with a collective of many
                  online platforms by partnering with us.
                </li>
                <li>
                  Our goal is to grow together. Therefore, we are seeking the
                  BEST businesses and professionals to work with.
                </li>
                <li>
                  Major and small companies worldwide are already partnering
                  with us. Let's work together to solve global oral health
                  issues. We know our services are valuable for both patients
                  and dental practices. <br /> Teledental connects patients and
                  dentists. As a platform, we will only continue to get bigger
                  and better. Working with the right companies and professionals
                  will help us both get there faster, easier, and better. OUR
                  GOAL IS TO HAVE A WIN-WIN PARTNERSHIP WITH YOU
                </li>
              </ul>
              <h3>What are the benefits of your service?</h3>
              <ul>
                <li>
                  Teledental services have become increasingly attractive to
                  patients and providers alike. It allows healthcare facilities
                  to use their existing resources to conduct remote
                  consultations, which are less time-consuming and far more
                  efficient than an in-person office visit.
                </li>
                <li>
                  Providers don't need to spend as much time caring for patients
                  in person, and patients are saved a drive to the healthcare
                  provider's office. A strong Virtual Dental Care or Live Dental
                  Telehealth component to your brand will significantly increase
                  efficiency and result in providers seeing more patients in a
                  shorter time.
                </li>
              </ul>
              <h3>Why Teledental over another similar Telehealth business?</h3>
              <ul>
                <li>
                  Teledental has been a leading provider of tele-dental
                  services. With DentalChat, we have been around for over 14
                  years. We were amongst the earliest companies on the scene,
                  and we have seen incredible growth over the last year.
                </li>
                <li>
                  Our team has the expertise, connections, and marketing skills
                  necessary to scale businesses as big as we want them to grow.
                </li>
                <li>
                  One of our top priorities currently is recruiting more
                  dentists for our service, and one of the primary reasons for
                  this is that we have a high interest in our service from the
                  general public. Therefore, we seek more dentists and dental
                  practices to help these patients.
                </li>
                <li>
                  We need more dentists to answer dental questions and more
                  dental practices to refer these patients to. Go to our Contact
                  Us page or email us at service@teledental.com for more
                  information. Click here to go to the Local Teledental Dental
                  Consult CONTACT US page.{" "}
                  <Link to="/contact-us">
                    https://teledental.com/contact-us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqsQuestion;
