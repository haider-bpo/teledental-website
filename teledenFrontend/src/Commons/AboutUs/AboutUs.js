import React, { useState } from "react";
import HelmetComponent from "../HelmetComponent";
import Header from "../Header";
import styles from "./AboutUs.module.css";
import { Form, Input, Button, Alert } from "antd";
import { contactUs } from "../../Auth/apis/authV1";
import Swal from "sweetalert2";

function AboutUs() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const [form] = Form.useForm();
	const { TextArea } = Input;
	const onFinish = async (values) => {
		try {
			setLoading(true);
			const body = {
				...values,
				type: "about_us",
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
			<div
				style={{
					color: "#000",
					maxWidth: "900px",
					margin: "0 auto 20px",
				}}
				className="contact-us-section pt-96 px-3"
			>
				<div className="pt-4">
					<HelmetComponent
						title="About Us | Teledental"
						name="About Us"
						content="Teledental.com is leading the way with new virtual dentistry
                    consulting and more. We are looking at providing useful
                    local teledentistry info, while using the best virtual
                    dental technology to that."
					/>
					<p
						style={{
							display: "flex",
							justifyContent: "center",
							color: "#0071bc",
						}}
					>
						<h2>About Teledental.com</h2>
					</p>
					<p>
						Teledental.com was founded by a <b>dentist and a dedicated team</b>{" "}
						who recognized the urgency for{" "}
						<b>faster, more accessible dental care</b>. Now our team includes
						many dentists and professionals with the passion to help people with
						their dental needs. Too often, people experience{" "}
						<b>tooth pain, dental infections, or dental emergencies</b> but
						struggle to get timely care due to long wait times, high costs, or
						lack of nearby dental providers. Our mission is simple:{" "}
						<b>
							connect people with professional dentists in real-time, offering
							expert advice, diagnosis, and guidance whenever they need it.
						</b>
					</p>

					<p>
						What started as a vision has now grown into a{" "}
						<b>global teledental</b> and <b>local teledentistry platform</b>,
						bringing together experienced dentists from across the U.S. and
						beyond. Through{" "}
						<b>video consultations, online chat, and AI-powered dental tools</b>
						, we are making professional dental care more convenient and
						accessible than ever before. Whether it’s a quick consultation for
						tooth pain, an emergency dental question, or a second opinion on a
						procedure,{" "}
						<b>
							Teledental.com ensures that expert dental advice is just a click
							away.
						</b>
					</p>

					<p>
						<h3>What is Teledental Care?</h3>
					</p>
					<p>
						<b>Teledental care</b> is the future of dentistry, offering{" "}
						<b>24/7 virtual dental consultations</b> through{" "}
						<b>video calls, online chat, and AI-assisted diagnostics</b>.
						Whether you have a{" "}
						<b>
							toothache, gum infection, broken tooth, or need a second opinion
						</b>
						, our licensed dentists are available day and night to provide
						expert guidance. At <b>Teledental.com</b>, we ensure that patients
						receive real-time dental advice from the comfort of their homes,
						avoiding unnecessary ER visits and long waits at traditional dental
						offices.
					</p>

					<p>
						<h3>
							Importance of Immediate Dental Health Care Services & Your Local
							Dentist Visit
						</h3>
					</p>
					<p>
						<b>
							While Teledental.com provides real-time virtual dental
							consultations, it is important for patients to understand that
							certain dental conditions require immediate in-person care.
						</b>{" "}
						If you are experiencing{" "}
						<b>
							severe dental pain, uncontrolled bleeding, facial swelling, or
							signs of a serious infection
						</b>
						, you should visit a{" "}
						<b>local dental office, urgent care center, or emergency room</b> as
						soon as possible. <i>Local Teledentistry Consultations</i> can be a
						valuable tool for dental guidance, second opinions, and prescription
						support when appropriate, but it{" "}
						<b>is not a substitute for necessary in-person dental procedures</b>{" "}
						such as extractions, root canals, or emergency surgery. Patients
						must take responsibility for their <b>own oral health</b> by
						maintaining regular dental checkups, following up on recommended
						treatments, and seeking <b>in-office care when required</b>. At{" "}
						<b>Teledental.com</b>, our goal is to provide{" "}
						<b>trusted, professional dental information</b> to help patients
						make informed decisions about their <b>dental care needs</b> while
						ensuring they take the right steps for their{" "}
						<b>long-term oral health</b>.
					</p>
					<p>
						<h3>
							Teledental Service and Local Dentists - Visiting Your Local Dental
							Office
						</h3>
					</p>
					<p>
						At Teledental.com, we believe in the importance of collaboration
						with local dentists to ensure that patients receive the highest
						standard of care. While our platform offers convenient, real-time
						virtual consultations, we strongly encourage patients to maintain a
						relationship with a local dentist for regular check-ups, preventive
						care, and professional cleanings (prophy). Regular visits to a local
						dental office are essential for maintaining good oral health,
						preventing long-term issues, and receiving hands-on treatments that
						cannot be addressed through telehealth. We are committed to working
						alongside local dental professionals to help bridge the gap between
						online and in-person care, ensuring patients have access to the best
						of both worlds. Teledental.com is here to empower you with dental
						knowledge and timely dental advice, but it is equally important to
						get regular dental care at your local dental office for a
						well-rounded approach to optimal oral health. Each individual is
						responsible fully for their own dental care and needs to make their
						own decisions.
					</p>
					<p>
						<h3>Expanding Globally in 2025 & 2026</h3>
					</p>
					<p>
						With an ambitious vision for the future, Teledental.com is expanding
						its network worldwide, bringing real-time dental expertise to more
						people across the globe. We are actively growing our team of{" "}
						<b>
							licensed dentists, dental professionals, and strategic healthcare
							partners
						</b>{" "}
						to enhance the accessibility and quality of virtual dental services.
					</p>

					<p>
						<h3>
							Dental Prescriptions & Dental Antibiotics Rx Virtually in the U.S.
						</h3>
					</p>
					<p>
						For certain dental conditions, our licensed U.S. dentists can
						prescribe <b>dental antibiotics</b>, such as{" "}
						<b>Amoxicillin, Clindamycin, or other necessary medications</b>,
						when appropriate. These prescriptions are issued based on a thorough
						virtual consultation and are sent to a local pharmacy for pickup.{" "}
						<b>Patients with any known antibiotic allergies must inform us</b>{" "}
						before a prescription is issued to ensure their safety and
						well-being. Teledental.com follows strict{" "}
						<b>telehealth guidelines</b> to ensure that prescriptions are
						provided only when medically necessary. We do not Rx / do not
						prescribe pain medications.
					</p>

					<p>
						<h3>Taking Responsibility for Your Dental Health</h3>
					</p>
					<p>
						While Teledental.com provides{" "}
						<b>real-time, secure online dental information and guidance</b>, it
						is essential for patients to take{" "}
						<b>an active role in their own dental care</b>. Our platform is here
						to help you{" "}
						<b>
							understand symptoms, explore possible treatment options, and
							receive expert advice
						</b>
						, but we strongly encourage patients to{" "}
						<b>
							research their dental needs, seek in-person care when necessary
						</b>
						, and maintain regular dental checkups.{" "}
						<b>Teledental care is a tool to empower you</b>, helping you make
						informed decisions about your{" "}
						<b>oral health and overall well-being</b>.
					</p>

					<p>
						<h3>Why Choose Teledental.com?</h3>
					</p>
					<ul>
						<li>
							Founded by a{" "}
							<b>dentist and a team dedicated to improving dental access</b>.
						</li>
						<li>
							Instant access to <b>licensed dentists</b> in the USA with no
							waiting rooms.
						</li>
						<li>
							Affordable and transparent pricing – Affordable Virtual dental
							care help and information consults &gt; for a{" "}
							<b>10-minute or less live dentist consultation</b>.
						</li>
						<li>
							24/7 online dental care with <b>real-time video consultations</b>.
						</li>
						<li>
							AI-powered dental support combined with expert human insights.
						</li>
						<li>
							Expanding beyond the U.S. to provide world-class teledental care
							internationally.
						</li>
						<li>
							Trusted by a growing community of{" "}
							<b>dental professionals, healthcare providers, and partners</b>.
						</li>
					</ul>

					<p>
						<h3>
							Taking Live Dentists Help Online and Virtual Dental Health Care
							Exam Advice Online
						</h3>
					</p>
					<p>
						While to provide <b>dental care online suggestions and guidance</b>,
						it is essential for patients to take an{" "}
						<b>active role in their own dental care</b>. Our platform is here to
						help you{" "}
						<b>
							understand symptoms, explore possible treatment options, and
							receive expert advice
						</b>
						, but we strongly encourage patients to{" "}
						<b>research their dental needs</b>, seek{" "}
						<b>in-person care when necessary</b>, and maintain regular dental
						checkups. <b>Teledental care is a tool to empower you</b> - helping
						you perhaps make more informed decisions about your{" "}
						<b>oral health and overall well-being</b>.
					</p>

					<p>
						<h3>Summary:</h3>
					</p>
					<p>
						Teledental.com is part of a group of innovative dental online
						platforms. The{" "}
						<b>
							Teledental.com team has been a pioneer in Local Teledental Care,
							Virtual Dental Chat with Dentists and Live Teledentistry,
							transforming the way people access dental care through
							cutting-edge virtual consultations, AI-powered diagnostics, and
							real-time dental chat support
						</b>
						. As one of the trailblazing, leading platforms in{" "}
						<b>virtual dental care</b>, Teledental.com has helped thousands of
						patients receive expert dental advice without the need for in-office
						visits. By leveraging <b>advanced AI technology</b>, we provide
						instant{" "}
						<b>
							dental symptom analysis, automated triage, and smart dental
							recommendations
						</b>
						, enhancing the accuracy and efficiency of online consultations. Our{" "}
						<b>24/7 dental chat</b> connects users with <b>licensed dentists</b>{" "}
						who can assess issues, offer second opinions, and provide{" "}
						<b>remote prescriptions for dental antibiotics</b> when necessary.
						As teledentistry continues to evolve,{" "}
						<b>Teledental.com remains at the forefront of innovation</b>, making{" "}
						<b>dental care more accessible, affordable, and convenient</b> for
						patients worldwide. Whether it’s an emergency, a simple question, or
						long-term treatment guidance,{" "}
						<b>
							Teledental.com is shaping the future of digital dentistry with
							AI-driven solutions and real-time virtual care
						</b>
						.
					</p>

					<p>
						We welcome partnering and working with local dentists, dental
						companies and health care groups. Local dental offices can connect
						with us to help more new patients.
					</p>
					<p><h3>Contact Us</h3></p>
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
									<Input />
								</Form.Item>
							</div>
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
									<TextArea
										rows={4}
										placeholder="Comments ..."
									/>
								</Form.Item>
							</div>
						</div>

						{/* <div className="col-sm-12 col-md-12 d-none">
              <Form.Item label="Type" name="type" initialValue="about_us">
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
			</div>
		</>
	);
}
export default AboutUs;
