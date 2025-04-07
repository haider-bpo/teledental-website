// import { FacebookFilled } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
// import GoogleIcon from "../../assets/svg/GoogleIcon";
import { useUserContext } from "../../Context/userContext";
import { signup } from "../../Auth/apis/authV1";
import Header from "../Header";
import styles from "./PatientSignUp.module.css";
import SignInModal from "../../Auth/SignInModal";
import { Link, useHistory } from "react-router-dom";
import logoOld from "../../assets/img/TeleDental-web.webp";
import { PlacesAutocompleteWrapper } from "../PlacesAutoCompleteWrapper";
import bigImg from "../../assets/img/banner_img.webp";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
function PatientSignUp({
  isModalVisible,
  setIsModalVisible,
  // setIsVerificationModalVisible,
  // setEntity,
}) {
	const [address, setAddress] = React.useState({});
	const [btnDisabled, setBtnDisabled] = React.useState(true);
	const history = useHistory();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const { setToken } = useUserContext();
	const [isSignInModalVisible, setIsSignInModalVisible] = React.useState(false);
	const [isSignUpPressed, setIsSignUpPressed] = useState(true);
	const [firstCaptch, setfirstCaptch] = useState(0);
	const [secondCaptch, setsecondCaptch] = useState(0);
	const [totalCaptch, setTotalCaptch] = useState("");
	const [isVerificationModalVisible, setIsVerificationModalVisible] =
		React.useState(false);
	const [entity, setEntity] = React.useState("");
	const [form] = Form.useForm();

  const onValuesChange = (changedValues, allValues) => {
    console.log({ allValues });

    if (
      allValues.password !== undefined &&
      allValues.password !== "" &&
      allValues.email !== undefined &&
      allValues.email !== "" &&
      allValues.firstName !== undefined &&
      allValues.firstName !== "" &&
      allValues.lastName !== undefined &&
      allValues.lastName !== "" &&
      allValues?.confirmEmail !== undefined &&
      allValues?.confirmEmail !== "" &&
      allValues.checkbox !== undefined &&
      allValues.checkbox
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
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

	const onFinish = async (values) => {
		try {
			if (isSignUpPressed) {
				debugger;
				// let user_captcha = document.getElementById("user_captcha_input").value;
				// if (validateCaptcha(user_captcha) == true) {
				if (firstCaptch + secondCaptch == Number(totalCaptch)) {
					//loadCaptchaEnginge(6);
					//document.getElementById("user_captcha_input").value = "";
					setLoading(true);
					const res = await signup({ entity: "patients", body: values });
					// setToken(res?.data?.token);
					// window.localStorage.setItem("token", res?.data?.token);
					// setError("");
					message.success(res.message, 20);
					// setEntity("patients");
					history.push("/");
					setIsModalVisible("");
					// setIsVerificationModalVisible(true);
					form.resetFields();
					setIsSignUpPressed(true);
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

	return (
		<>
			<Header cssClassName="nav-bg-black" />
			<Form
				form={form}
				layout="vertical"
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onValuesChange={onValuesChange}
			>
				<div className="n_signup_wrapper n_signup_wrapper_patient">
					<div className="signup-page-box signup-patient-page-box">
						<div className="signup-page-headline">
							<h2
								className={`mb-0 w-100 text-center ${styles.h2}`}
								style={{ marginTop: "65px" }}
							>
								Patient <span>Registration</span>
							</h2>
							<p className="text-center fs-6">
								Let's get started. To request a Teledental video consultation
								with a dentist, please fill this out. Note that there is a $50
								charge for a 10-minute or less Teledental live video
								consultation with a live dentist.{" "}
							</p>
							<div
								className="px-3 text-center py-2"
								style={{
									marginTop: "20px",
									fontSize: "22px",
									fontWeight: 500,
									color: "#0071bc",
								}}
							>
								If already have an account, please
								<Link
									className="d-inline-block mt-0 ml-1 text-decoration-underline"
									block
									type="primary"
									// htmlType="submit"
									loading={loading}
									size="large"
									style={{ color: "#F7A5F9" }}
									onClick={() => setIsSignInModalVisible(true)}
								>
									Login
								</Link>
							</div>
						</div>

            <div
              className={`row d-flex mt-4 right-side-check w-75 m-0 mx-auto ${styles.WrapperRightlable}`}
            >
              {error && (
                <Alert
                  style={{ marginBottom: "20px" }}
                  message={error}
                  type="error"
                  showIcon
                />
              )}
              <div className="col-sm-12">
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="* First Name"
                    style={{
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
                    { required: true, message: "Please input your last name!" },
                  ]}
                >
                  <Input
                    placeholder="* Last Name"
                    style={{
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
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    placeholder="* Email"
                    style={{
                      fontWeight: 700,
                      height: "49px",
                      borderRadius: "4px",
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-sm-12">
                <Form.Item
                  name="confirmEmail"
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
                        return Promise.reject(new Error("Email do not match"));
                      },
                    }),
                  ]}
                >
                  <Input
                    placeholder="* Confirm Email"
                    style={{
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
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    placeholder="* Password"
                    style={{
                      fontWeight: 700,
                      height: "49px",
                      borderRadius: "4px",
                    }}
                  />
                </Form.Item>
              </div>
              {/* <div className="col-sm-6 col-md-4">
              <Form.Item label="Description" name="Description">
                <Input />
              </Form.Item>
            </div>
            <div className="col-sm-6 col-md-4">
              <Form.Item
                label=" What is going on (explain briefly)?"
                name="briefly"
              >
                <Input />
              </Form.Item>
            </div> */}
              <div className="col-sm-12">
                <Form.Item
                  name="Address"
                  style={{
                    fontWeight: 700,
                  }}
                >
                  <PlacesAutocompleteWrapper
                    address={address.address}
                    setAddress={setAddress}
                    className={styles.location_field}
                  />
                </Form.Item>
              </div>
              <div className="col-12">
                <div className="form-group mb-0">
                  <label className={`mb-2 ${styles.questionsLabel}`}>
                    Are you looking to get a Live Teledental consultation?
                  </label>
                </div>
                <div className="d-flex align-items-center gap-4 mb-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault-9"
                      id="yes-9"
                    />
                    <label class="form-check-label" for="yes-9">
                      Yes
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault-9"
                      id="no-9"
                    />
                    <label class="form-check-label" for="no-9">
                      No
                    </label>
                  </div>
                </div>
              </div>

              {/* <div className="mb-4 col-12">
              <div className="form-group">
                <label className={`mb-2 ${styles.questionsLabel}`}>
                  Pain level
                </label>
              </div>
              <div className="d-flex justify-content-between w-50 w-edit-again">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-3"
                    id="low"
                  />
                  <label class="form-check-label" for="low">
                    Low
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-3"
                    id="medium"
                  />
                  <label class="form-check-label" for="medium">
                    Medium
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-3"
                    id="high"
                  />
                  <label class="form-check-label" for="high">
                    High
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4 col-12">
              <div className="form-group">
                <label className={`mb-2 ${styles.questionsLabel}`}>
                  When was the last time you had a professional cleaning at a
                  dental office?*
                </label>
              </div>
              <div className="d-flex justify-content-between w-70 flex-wrap">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-4"
                    id="yes-4"
                  />
                  <label class="form-check-label" for="yes-4">
                    Less than one year
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-4"
                    id="no-4"
                  />
                  <label class="form-check-label" for="no-4">
                    One year or more
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4 col-12">
              <div className="form-group">
                <label className={`mb-2 ${styles.questionsLabel}`}>
                  When was your last visit to the dentist?*
                </label>
              </div>
              <div className="d-flex justify-content-between w-70 flex-wrap">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-5"
                    id="yes-5"
                  />
                  <label class="form-check-label" for="yes-5">
                    Less than one year
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-5"
                    id="no-5"
                  />
                  <label class="form-check-label" for="no-5">
                    One year or more
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4 col-12">
              <div className="form-group">
                <label className={`mb-2 ${styles.questionsLabel}`}>
                  When was the last time you had dental x-rays?*
                </label>
              </div>
              <div className="d-flex justify-content-between w-70 flex-wrap">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-6"
                    id="yes-6"
                  />
                  <label class="form-check-label" for="yes-6">
                    Less than one year
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-6"
                    id="no-6"
                  />
                  <label class="form-check-label" for="no-6">
                    One year or more
                  </label>
                </div>
              </div>
            </div> */}

              {/* <div className="mb-4 col-12">
              <div className="form-group">
                <label className={`mb-2 ${styles.questionsLabel}`}>
                  Do you have dental insurance?
                </label>
              </div>
              <div className="d-flex justify-content-between w-50">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-7"
                    id="yes-7"
                  />
                  <label class="form-check-label" for="yes-7">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-7"
                    id="no-7"
                  />
                  <label class="form-check-label" for="no-7">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4 col-12">
              <div className="form-group">
                <label className={`mb-2 ${styles.questionsLabel}`}>
                  Are you interested in patient financing?
                </label>
              </div>
              <div className="d-flex justify-content-between w-50">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-8"
                    id="yes-8"
                  />
                  <label class="form-check-label" for="yes-8">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault-8"
                    id="no-8"
                  />
                  <label class="form-check-label" for="no-8">
                    No
                  </label>
                </div>
              </div>
            </div> */}

              <div className="row px-0">
                {/* <div className="col-sm-12 col-md-8 mb-3">
                <label className={`mb-2 ${styles.questionsLabel}`}>
                  Are you interested in adding teledental technology to your
                  dental website?
                </label>
                <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                  <div>
                    <Checkbox value="A">Find a dentist (Free)</Checkbox>
                  </div>

                  <div>
                    <Checkbox value="B">
                      Ask a dental question (Free consultation)
                    </Checkbox>
                  </div>
                  <div>
                    <Checkbox value="C">
                      15-min Video consultation (fee USD 59)
                    </Checkbox>
                  </div>
                  <div>
                    <Checkbox value="D">
                      15-min Video consultation + Electronic prescription
                    </Checkbox>
                  </div>
                </Checkbox.Group>
              </div> */}
								<div className="col-sm-12 col-md-12">
									<div className="form-group">
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
								</div>
							</div>
							<div style={{ display: isSignUpPressed ? "block" : "none" }}>
								{/* <div>
									<LoadCanvasTemplate />
								</div> */}
								{/* <div
									className="col mt-3"
									style={{ marginBottom: "20px" }}
								>
									<div>
										<input
											placeholder="Enter Captcha Value"
											id="user_captcha_input"
											name="user_captcha_input"
											type="text"
										></input>
									</div>
								</div> */}
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
							<div class="note__txt">
								<b>Note:</b> We will need further information before doing any
								Live Teledental Dentist Video Consultation, so we can best serve
								you. If you have any immediate medical or dental emergency - you
								should visit a local dentist or local ER office.
							</div>
						</div>
					</div>
					<div
						className="n_signup_vactors"
						style={{ marginTop: "90px" }}
					>
						<Link
							to="/"
							className="n_signup_logo mb-4"
						>
							<img
								// src={isScrolled ? logoOld : logoNew}
								src={logoOld}
								alt="TeleDental"
							/>
						</Link>
						<div className="n_signup_img">
							<h3 class="tagLineText">
								Live <span>Teledental</span> <br /> Consultation
							</h3>
							<img
								src={bigImg}
								alt="TeleDental"
							/>
						</div>
						<div className="n_signup_img_text">
							<h2>
								Talk with a Live Dentist on <span> Teledental.com </span>
							</h2>
							<i>Anywhere, 24/7</i>
						</div>
					</div>
				</div>
			</Form>
			<SignInModal
				isModalVisible={isSignInModalVisible}
				setIsModalVisible={setIsSignInModalVisible}
				setIsVerificationModalVisible={setIsVerificationModalVisible}
				setEntity={setEntity}
			/>
		</>
	);
}

export default PatientSignUp;
