// import { FacebookFilled } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
// import GoogleIcon from "../../assets/svg/GoogleIcon";
import { useUserContext } from "../../Context/userContext";
import { signup } from "../../Auth/apis/authV1";
import Header from "../Header";
import styles from "./SignupSuccess.module.css";
import SignInModal from "../../Auth/SignInModal";
import { Link, useHistory } from "react-router-dom";
import logoOld from "../../assets/img/TeleDental-web.png";
import { PlacesAutocompleteWrapper } from "../PlacesAutoCompleteWrapper";
import bigImg from "../../assets/img/banner_img.png";
import { verifyEmail } from "../apis/commonV1";
import { useParams } from "react-router";

function SignupSuccess({
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
	const [isVerificationModalVisible, setIsVerificationModalVisible] =
		React.useState(false);
	let { email } = useParams();
	useEffect(() => {
		let mounted = true;
		verifyEmail(email).then((items) => {});
		return () => (mounted = false);
	}, []);

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

	const onFinish = async (values) => {
		try {
			setLoading(true);
			const res = await signup({ entity: "patients", body: values });
			// setToken(res?.data?.token);
			// window.localStorage.setItem("token", res?.data?.token);
			// setError("");
			message.success(res.message);
			// setEntity("patients");
			history.push("/");
			setIsModalVisible("");
			// setIsVerificationModalVisible(true);
			form.resetFields();
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
				<div
					className={`n_signup_wrapper ${styles.verification_success} n_signup_wrapper_patient`}
				>
					<div className="signup-page-box signup-patient-page-box">
						<div className="signup-page-headline">
							<h2 className={`mb-0 w-100 text-center signup-h2 ${styles.h2}`}>
								Account <span>Verification</span>
							</h2>
							<div
								className="px-3 text-center montsarretNormal py-2"
								style={{ marginTop: "65px" }}
							>
								Welcome to Teledental.com! Thank you for signing up. You can now
								log into your account. Our goal is to connect you with live
								dentists online, providing dental information and bringing
								smiles. We appreciate your support and patience as we expand.
								We're delighted to have you join our community!
							</div>
							<div className={`${styles.btn_redirect}`}>
								<button
									className=" btn_blue"
									onClick={() => window.open("https://teledental.com", "_self")}
								>
									Go to Teledental
								</button>
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
							<img
								src={bigImg}
								alt="TeleDental"
							/>
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

export default SignupSuccess;
