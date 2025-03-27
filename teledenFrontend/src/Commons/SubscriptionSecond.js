import React from "react";
import { Form, Input, Button, Alert } from "antd";

function SubscriptionSecond() {
	return (
		<>
        <div className="heading-text">
        <h1 className="main-heading">
          Exclusive sign-up offer for dentists and dental practices.
        </h1>
        <div className="perks2">
          <p>Get featured in your area</p>
          <p>Offering 3 subscription packages </p>
          <p>Save time and increase your office income </p>
        </div>
        <h6>Directory listings, get patient leads, dental SEO marketing, Teledental services, add chatbot, smart dental
          technology, and <span>many more specials.</span> </h6>
        <h6>The <span>#1 dental ecosystem and best multiservice</span> place for dentists and dental practices. No company can match all
          that we can offer your practice. </h6>
      </div>
      <div className="cards2">
        <div className="card2">
          <div className="card-footer2">
            <div className="purchase2">Purchase Plan</div>
          </div>
        </div>
        <div className="card2"
             id="elite">
          <div className="card-footer2">
            <div className="purchase2">Purchase Plan</div>
          </div>
        </div>
        <div className="card2"
             id="platinum">
          <div className="card-footer2">
            <div className="purchase2">Purchase Plan</div>
          </div>
        </div>
      </div>
      <div className="membership">
        <p><strong>There is an exclusive <span>platinum membership</span> for dentists. </strong></p>
        <p>To find out more,
          please fill out this form to get more information. </p>
      </div>
      <div className="forms2">
        <div className="form-items">
            <div className="row d-flex m-0 business- ">
                <div className="col-sm-12 col-lg-6 pl-0 pr-3">
                    <div className="form-wrap">
                        <Form.Item
                        name="name"
                        placeholder="Name"
                        rules={[
                            {
                            message: "Please input your first name!",
                            },
                        ]}
                        >
                        <Input placeholder="Lorem Ipsum" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-6 p-0">
                    <div className="form-wrap">
                        <Form.Item
                        name="companyName"
                        placeholder="Company Name"
                        rules={[
                            {
                            message: "Please input your first name!",
                            },
                        ]}
                        >
                        <Input placeholder="Company Name" />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="row d-flex m-0 business- ">
            <div className="col-sm-12 col-lg-6 pl-0 pr-3">
              <div className="form-wrap">
                <Form.Item
                  name="position"
                  placeholder="Position"
                >
                  <Input placeholder="Position" />
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 p-0">
              <div className="form-wrap">
                <Form.Item
                  name="phoneNumber"
                  placeholder="Phone Number"
                >
                  <Input type="number" placeholder="Phone Number" />
                </Form.Item>
              </div>
            </div>
            </div>
            <div className="row d-flex m-0 business- ">
            <div className="col-sm-12 col-lg-6 pl-0 pr-3">
              <div className="form-wrap">
                <Form.Item
                  name="email"
                  placeholder="Email"
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 p-0">
              <div className="form-wrap">
                <Form.Item
                  name="confirmEmail"
                  placeholder="Confirm Email"
                >
                  <Input placeholder="Confirm Email" />
                </Form.Item>
              </div>
            </div>
            </div>
            <div class="row d-flex">
              <div className="col-12 p-0">
                <div className="form-wrap">
                  <Form.Item
                    name="officeLocation"
                    placeholder="Office Location"
                  >
                    <Input placeholder="Office Location" />
                  </Form.Item>
                </div>
              </div>
            </div>
        </div>
        <div className="submit2">Submit</div>
      </div>
      <div className="footer2">
        <h6>Qualified Dentists & Professionals: Embrace the Future with Us. Be Part of the Solution.</h6>
        <h6>Contact Us: service@teledental.com</h6>
      </div></>
	);
}

export default SubscriptionSecond;
