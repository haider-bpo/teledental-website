import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Alert, Select } from "antd";
import { signup } from "../../Auth/apis/authV1";
import { useUserContext } from "../../Context/userContext";
// import { FacebookFilled } from "@ant-design/icons";
// import GoogleIcon from "../../assets/svg/GoogleIcon";
import { PlacesAutocompleteWrapper } from "../PlacesAutoCompleteWrapper";
// import logo from "../../assets/img/logo.webp";
import styles from "./DentistSignUp.module.css";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import SignInModal from "../../Auth/SignInModal";
import SignUpSuccessModal from "../../Dentist/SignUpSuccessModal";
import queryString from "query-string";
import logoOld from "../../assets/img/TeleDental-web.webp";
import bigImg from "../../assets/img/d_reg_img.webp";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
const { Option } = Select;

function DentistSignUpModal() {
	let location = useLocation();
	let { pathname } = location;
	let query = queryString.parse(location.search);
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [btnDisabled, setBtnDisabled] = React.useState(true);
	const { setToken } = useUserContext();
	const [address, setAddress] = React.useState({});
	const [isSignInModalVisible, setIsSignInModalVisible] = React.useState(false);
	const [isVerificationModalVisible, setIsVerificationModalVisible] =
		React.useState(false);
	const [isSignUpSuccessModalVisible, setIsSignUpSuccessModalVisible] =
		React.useState(query.notApproved ? true : false);
	const [entity, setEntity] = React.useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isSignUpPressed, setIsSignUpPressed] = useState(true);
	const [firstCaptch, setfirstCaptch] = useState(0);
	const [secondCaptch, setsecondCaptch] = useState(0);
	const [totalCaptch, setTotalCaptch] = useState("");
	const [form] = Form.useForm();
	const { TextArea } = Input;
	const onFinish = async (values) => {
		try {
			if (isSignUpPressed) {
				// let user_captcha = document.getElementById("user_captcha_input").value;
				// if (validateCaptcha(user_captcha) == true) {
				if (firstCaptch + secondCaptch == Number(totalCaptch)) {
					setLoading(true);
					const body = {
						...values,
						location: address,
					};
					if (body.businessName == undefined) {
						body.businessName = '';
					}
					const res = await signup({ entity: "dentists", body });
					if (res) {
						if (res.status == 200) {
							setError("");
							setLoading(false);
							setEntity("dentists");
							// closeModal();
							setIsSignUpSuccessModalVisible(true);
							setIsModalVisible(true);
						} else {
							setError(res.message);
						}
					}
					form.resetFields();
					var radios = document.querySelectorAll('input[type="radio"]');
					radios.forEach(function (radio) {
						radio.checked = false;
					});
					// setIsVerificationModalVisible(true);
					setIsSignUpPressed(true);
					generateNumber();
				} else {
					//document.getElementById("user_captcha_input").value = "";
					generateNumber();

				}
			} else {
				setIsSignUpPressed(true);
			}
		} catch (error) {
			setLoading(false);
			setError(error.errMsg);
		}
	};

	useEffect(() => {
		//loadCaptchaEnginge(6);
		generateNumber();
	}, []);

	const generateNumber = () => {
		setfirstCaptch(Math.floor(Math.random() * 10));
		setsecondCaptch(Math.floor(Math.random() * 10));
		setTotalCaptch("");
	};

	const reload = () => {
		generateNumber();
	};

	const onValuesChange = (changedValues, allValues) => {
		if (
			allValues.password !== undefined &&
			allValues.password !== "" &&
			allValues.email !== undefined &&
			allValues.email !== "" &&
			allValues.firstName !== undefined &&
			allValues.firstName !== "" &&
			allValues.lastName !== undefined &&
			allValues.lastName !== "" &&
			allValues?.["confirm email"] !== undefined &&
			allValues?.["confirm email"] !== "" &&
			allValues.checkbox !== undefined &&
			allValues.checkbox
		) {
			setBtnDisabled(false);
		} else {
			setBtnDisabled(true);
		}
	};

	return (
		<>
			<Header cssClassName="nav-bg-black" />
			<div className="n_signup_wrapper">
				<div className="signup-page-box signup-patient-page-box">
					<Form
						form={form}
						layout="vertical"
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onValuesChange={onValuesChange}
					>
						{error && (
							<Alert
								style={{ marginBottom: "20px", marginTop: "60px" }}
								message={error}
								type="error"
								showIcon
							/>
						)}
						<div className="signup-page-headline">
							<div className="d-flex justify-content-center"></div>
							<h2
								className={`mb-0 w-100 text-center ${styles.h2}`}
								style={{ marginTop: error ? "5px" : "65px" }}
							>
								Dentist <span>Registration</span>
							</h2>
							<div className="px-4 mb-3 text-center montsarretNormal py-2">
								If already have an account, please
								<Link
									className="d-inline-block mt-0 ml-1 text-decoration-underline"
									block
									type="secondary"
									size="large"
									loading={loading}
									onClick={() => setIsSignInModalVisible(true)}
								>
									Login
								</Link>
							</div>
						</div>

						<div className="row w-75 d-flex justify-content-end business- mx-auto">
							<div className="signup-bg-wrapper px-0">
								<div className="signup-inner-content">
									<div className="row">
										<div className="col-sm-12">
											<Form.Item
												name="firstName"
												rules={[
													{
														required: true,
														message: "Please input your first name!",
													},
												]}
												className="my-custom-class"
											>
												<Input
													placeholder="* First Name"
													style={{
														fontWeight: 700,
														fontWeight: 700,
														height: "49px",
														borderRadius: "4px",
													}}
												/>
											</Form.Item>
										</div>
										<div className="col-sm-12">
											<Form.Item
												name="lastName"
												rules={[
													{
														required: true,
														message: "Please input your last name!",
													},
												]}
											>
												<Input
													placeholder="* Last Name"
													style={{
														fontWeight: 700,
														fontWeight: 700,
														height: "49px",
														borderRadius: "4px",
													}}
												/>
											</Form.Item>
										</div>
										<div className="col-sm-12">
											<Form.Item
												name="email"
												rules={[
													{
														type: "email",
														message: "Invalid Email format!",
													},
													{
														required: true,
														message: "Please input your email!",
													},
												]}
											>
												<Input
													placeholder="* Email"
													style={{
														fontWeight: 700,
														fontWeight: 700,
														height: "49px",
														borderRadius: "4px",
													}}
												/>
											</Form.Item>
										</div>
										<div className="col-sm-12">
											<Form.Item
												name="confirm email"
												dependencies={["email"]}
												rules={[
													{
														required: true,
														type: "email",
														message: "Invalid Email!",
													},
													({ getFieldValue }) => ({
														validator(_, value) {
															if (!value || getFieldValue("email") === value) {
																return Promise.resolve();
															}
															return Promise.reject(
																new Error("Email do not match"),
															);
														},
													}),
												]}
											>
												<Input
													placeholder="* Confirm Email"
													style={{
														fontWeight: 700,
														fontWeight: 700,
														height: "49px",
														borderRadius: "4px",
													}}
												/>
											</Form.Item>
										</div>
										<div className="col-sm-12">
											<Form.Item
												name="phoneNumber"
												rules={[
													{
														required: true,
														message: "Please input your phone number!",
													},
												]}
											>
												<Input
													type="number"
													placeholder="* Phone Number"
													style={{
														fontWeight: 700,
														fontWeight: 700,
														height: "49px",
														borderRadius: "4px",
													}}
												/>
											</Form.Item>
										</div>
										<div className="col-sm-12">
											<Form.Item
												name="password"
												rules={[
													{
														required: true,
														message: "Please input your password!",
													},
												]}
											>
												<Input.Password
													placeholder="* Password"
													style={{
														fontWeight: 700,
														fontWeight: 700,
														height: "49px",
														borderRadius: "4px",
													}}
												/>
											</Form.Item>
										</div>
										<div className="col-sm-12 signup-select">
											<Form.Item name="city">
												<Select
													defaultValue="male"
													style={{
														fontWeight: 700,
														height: "49px",
														borderRadius: "4px",
													}}
												>
													<Option value="male">I am a licensed dentist</Option>
													<Option value="female">
														I want to join Teledental
													</Option>
													<Option value="other">
														Both- I am a licensed dentist and want to join
														Teledental
													</Option>
												</Select>
											</Form.Item>
										</div>
										<div className="col-sm-12">
											<Form.Item
												name="location"
												style={{
													fontWeight: 700,
												}}
												rules={[
													{
														required: true,
														message: "Please select your office address!",
														validator: async (rule, value) => {
															if (
																!address?.address ||
																!address.coordinates.length
															) {
																throw new Error(rule.message);
															}
														},
													},
												]}
											>
												<PlacesAutocompleteWrapper
													address={address.address}
													setAddress={setAddress}
													className={styles.location_field}
												/>
											</Form.Item>
										</div>
										<div className="col-sm-12">
											{" "}
											<Form.Item
												name="businessName"
												rules={[
													{
														message: "Please input your business name!",
													},
												]}
											>
												<Input
													placeholder="Business Name"
													style={{
														fontWeight: 700,
														fontWeight: 700,
														height: "49px",
														borderRadius: "4px",
													}}
												/>
											</Form.Item>
										</div>
										{/* <div className="col-sm-6 col-md-4">
                      <Form.Item
                        label="City"
                        name="city"
                        rules={[
                          {
                            // required: true,
                            message: "Please input your city!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <Form.Item
                        label="State"
                        name="state"
                        rules={[
                          {
                            // required: true,
                            message: "Please input your state!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>

                    <div className="col-sm-6 col-md-4">
                      <Form.Item
                        label=" How long have you been a dentist?"
                        name=" How long have you been a dentist?"
                        rules={[
                          {
                            // required: true,
                            // message: "Please input your city!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>

                    <div className="col-sm-6 col-md-4">
                      <Form.Item
                        label="If so, please provide the state"
                        name="If so, please provide the state"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please input your city!",
                        //   },
                        // ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <Form.Item
                        label="What state licensed in?"
                        name="What state licensed in?"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please input your city!",
                        //   },
                        // ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <Form.Item name="problem" label="How can we help?">
                        <TextArea rows={4} placeholder="Write your problem..." />
                      </Form.Item>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <Form.Item
                        name="address"
                        label="Dental practice address (optional)"
                      >
                        <TextArea rows={4} placeholder="Address..." />
                      </Form.Item>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="mb-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className={`mb-2 ${styles.questionsLabel}`}>
                      Are you interested in becoming teledental independent
                      consultant?
                    </label>
                  </div>
                  <div className="d-flex justify-content-between w-50">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-1"
                        id="yes-1"
                      />
                      <label className="form-check-label" for="yes-1">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-1"
                        id="no-1"
                      />
                      <label className="form-check-label" for="no-1">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className={`mb-2 ${styles.questionsLabel}`}>
                      Are you interested in adding teledental technology to your
                      dental website?
                    </label>
                  </div>
                  <div className="d-flex justify-content-between w-50">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-2"
                        id="yes-2"
                      />
                      <label className="form-check-label" for="yes-2">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-2"
                        id="no-2"
                      />
                      <label className="form-check-label" for="no-2">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className={`mb-2 ${styles.questionsLabel}`}>
                      Would you like to work with us and join teledental team?
                    </label>
                  </div>
                  <div className="d-flex justify-content-between w-50">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-3"
                        id="yes-3"
                      />
                      <label className="form-check-label" for="yes-3">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-3"
                        id="no-3"
                      />
                      <label className="form-check-label" for="no-3">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className={`mb-2 ${styles.questionsLabel}`}>
                      Are you licensed USA dentist?
                    </label>
                  </div>
                  <div className="d-flex justify-content-between w-50">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-4"
                        id="yes-4"
                      />
                      <label className="form-check-label" for="yes-4">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-4"
                        id="no-4"
                      />
                      <label className="form-check-label" for="no-4">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className={`mb-2 ${styles.questionsLabel}`}>
                      Are you licensed USA dentist, hygienist?
                    </label>
                  </div>
                  <div className="d-flex justify-content-between w-50">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-9"
                        id="yes-9"
                      />
                      <label className="form-check-label" for="yes-9">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-9"
                        id="no-9"
                      />
                      <label className="form-check-label" for="no-9">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className={`mb-2 ${styles.questionsLabel}`}>
                      Are you specialized in?
                    </label>
                  </div>
                  <div className="d-flex justify-content-between w-50">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-6"
                        id="yes-6"
                      />
                      <label className="form-check-label" for="yes-6">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-6"
                        id="no-6"
                      />
                      <label className="form-check-label" for="no-6">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className={`mb-2 ${styles.questionsLabel}`}>
                      Do you own a dental practice?
                    </label>
                  </div>
                  <div className="d-flex justify-content-between w-50">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-7"
                        id="yes-7"
                      />
                      <label className="form-check-label" for="yes-7">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-7"
                        id="no-7"
                      />
                      <label className="form-check-label" for="no-7">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className={`mb-2 ${styles.questionsLabel}`}>
                      Are you specialized in?
                    </label>
                  </div>
                  <div className="d-flex justify-content-between w-50">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-6"
                        id="yes-6"
                      />
                      <label className="form-check-label" for="yes-6">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault-6"
                        id="no-6"
                      />
                      <label className="form-check-label" for="no-6">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}
							<div className="col-md-12 col-lg-12 px-0">
								<div className="row px-0">
									<div className="col-sm-12">
										<Form.Item
											name="checkbox"
											valuePropName="checked"
											rules={[
												{ required: true, message: "Please accept terms!" },
											]}
										>
											<Checkbox>
												I agree{" "}
												<a
													href="https://teledental.com/terms-and-conditions"
													target="_blank"
												>
													terms of use
												</a>{" "}
												and{" "}
												<a
													href="https://teledental.com/privacy-policy-teledental"
													target="_blank"
												>
													{" "}
													privacy policy
												</a>
												.
											</Checkbox>
										</Form.Item>
									</div>
									<div></div>
									<div
										style={{
											display: isSignUpPressed ? "block" : "none",
										}}
									>
										{/* <div>
											<LoadCanvasTemplate />
										</div> */}
										<div
											className="col mt-3 d-flex align-items-center gap-2 p-0"
											style={{ marginBottom: "20px" }}
										>
											<Input
												disabled={true}
												value={firstCaptch}
												name="firstCaptcha"
												type="number"
												style={{
													fontWeight: 700,
													fontWeight: 700,
													height: "49px",
													width: "52px",
													borderRadius: "4px",
												}}
											/>{" "}
											+{" "}
											<Input
												disabled={true}
												type="number"
												name="secondCaptcha"
												value={secondCaptch}
												style={{
													fontWeight: 700,
													fontWeight: 700,
													height: "49px",
													width: "52px",
													borderRadius: "4px",
												}}
											/>{" "} = {" "}
											<Input
												placeholder="Enter the sum"
												type="number"
												value={totalCaptch}
												onChange={(e) => setTotalCaptch(e.target.value)}
													style={{
														fontWeight: 700,
														fontWeight: 700,
														height: "49px",
														borderRadius: "4px",
													}}
												/>
											<button
											onClick={reload}
											style={{
												fontSize: "24px",
												cursor: "pointer",
												border: "none",
												background: "none",
											}}
											>
											⭯
											</button>
										</div>
									</div>
									<div className="d-flex justify-content-center w-100">
										<Form.Item>
											<Button
												className="brix---btn-primary w-button btn-edit mb-2 h-auto"
												block
												type="primary"
												htmlType="submit"
												loading={loading}
												size="large"
												disabled={btnDisabled}
											>
												Sign up
											</Button>
										</Form.Item>
									</div>
								</div>
							</div>
						</div>

            {/* <Row style={{ display: "flex" }}>
            <Divider style={{ minWidth: "45%", width: "45%" }} />
            <Typography.Title
              style={{ lineHeight: "2.9", margin: "0 10px" }}
              level={5}
            >
              OR
            </Typography.Title>
            <Divider style={{ minWidth: "45%", width: "45%" }} />
          </Row>
          <Button
            className="shadow-sm hover"
            block
            size="large"
            icon={<GoogleIcon />}
            href={`${process.env.REACT_APP_API_BASE_URL}/api/v1/dentists/auth/google`}
            style={{ marginTop: "30px" }}
          >
            Continue with Google
          </Button>
          <Button
            className="shadow-sm hover"
            block
            size="large"
            icon={<FacebookFilled />}
            href={`${process.env.REACT_APP_API_BASE_URL}/api/v1/dentists/auth/facebook`}
            style={{
              marginTop: "30px",
              backgroundColor: "#3f51b5",
              color: "#FFF",
            }}
          >
            Continue with Facebook
          </Button> */}
          </Form>
        </div>
        <div className="n_signup_vactors">
          <Link to="/" className="n_signup_logo">
            <img
              // src={isScrolled ? logoOld : logoNew}
              src={logoOld}
              alt="TeleDental"
            />
          </Link>
          <div className="n_signup_img">
            <img src={bigImg} alt="TeleDental" />
          </div>
          <div className="n_signup_img_text">
            <h2>
              Virtual <span> Dental Care</span>
            </h2>
            <i>Anywhere, 24/7</i>
          </div>
        </div>
      </div>
      <SignInModal
        isModalVisible={isSignInModalVisible}
        setIsModalVisible={setIsSignInModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        setEntity={setEntity}
      />
      <SignUpSuccessModal
        isModalVisible={isSignUpSuccessModalVisible}
        setIsModalVisible={setIsSignUpSuccessModalVisible}
      />
    </>
  );
}

export default DentistSignUpModal;
