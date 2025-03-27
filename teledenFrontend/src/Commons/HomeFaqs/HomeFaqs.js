import React from "react";
import Style from "./HomeFaqs.module.css";
import { Link } from "react-router-dom";
// import img from "../../assets/img/hm_faq_img.png";
import img from "../../assets/img/hm_faq_img_1.png";

function HomeFaqs() {
	return (
		<section className={Style.faq_main}>
			<div className="autoContent">
				<div className={Style.faq_inner}>
					<div
						className={Style.faq_right}
						data-aos="fade-left"
						// data-aos-duration="400"
					>
						<span>
							<img
								src={img}
								alt="#"
							></img>
						</span>
						{/* <strong>
                             faq
                             <small>teledental</small>
                        </strong> */}
					</div>
					<div
						className={Style.faq_left}
						data-aos="fade-right"
						// data-aos-duration="500"
					>
						<h2>FAQ</h2>
						<h3>Want to learn more about us?</h3>
						<p>
							<span>
                                At <span style={{color:'#0071bc'}}>Teledental</span>, we make dental care easier and more accessible with 
                                <b> live teledentistry</b> services. Get expert advice from licensed
                                dentists through <b>virtual dental consultations</b>, all from the
                                comfort of your home. Whether you need a quick checkup, a second
                                opinion, or urgent dental guidance, we're here to help.
                            </span>
						</p>
                        <ul style={{color: '#0071bc'}}>
                            <li>Instant access to virtual dental consultations.</li>
                            <li>Expert answers from trusted, licensed teledentists.</li>
                            <li>Convenient teledentistry and office support.</li>
                        </ul>
                            <p><b>Live dental care help and information—anytime, anywhere.</b></p>
						<div className={Style.faq_btn_row}>
							<Link
								to="/faqs-question"
								name="faqs"
								className="color_white btn_blue"
								// onClick={() => setIsSignInModalVisible(true)}
							>
								Click here: FAQ
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HomeFaqs;
