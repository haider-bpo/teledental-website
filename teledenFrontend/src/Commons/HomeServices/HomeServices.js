import React from "react";
import Style from "./HomeServices.module.css";
import { Link } from "react-router-dom";
import icon1 from "../../assets/img/hm_services1.svg";
import icon2 from "../../assets/img/hm_services2.svg";
import icon3 from "../../assets/img/hm_services3.svg";
import icon4 from "../../assets/img/hm_services4.svg";
import icon5 from "../../assets/img/hm_services5.svg";
import icon6 from "../../assets/img/hm_services6.svg";
import icon7 from "../../assets/img/hm_services7.svg";
import icon8 from "../../assets/img/hm_services8.svg";
import icon9 from "../../assets/img/hm_services9.svg";

import styled from "styled-components";


function HomeServices() {
    return (
        <section className={Style.services_main}>
            <div className="autoContent">
                <div className={Style.services_inner}>
                    <div className={Style.services_heading} data-aos="fade-up" data-aos-duration="500">
                        <h2>Dental Information</h2>
                        <h3>Live Teledental Virtual Dental Care</h3>
                        <p>Online Dentistry Treatment Info</p>
                    </div>
                    <div className={Style.services_list}>
                        <ul>
                            <li>
                                <div className={Style.services_box} data-aos="fade-up" data-aos-once="false">
                                    <span>
                                        <img loading="lazy" src={icon1} alt="icon 1"></img>
                                    </span>
                                    <strong>
                                        <Link to={`/live-dentist-ai-teledental`}>
                                            Teledental & live video dentists

                                            <small className="d-block"><small className={`btn btn-primary ${Style.services_btn}`}>Learn more</small></small>
                                        </Link>
                                    </strong>
                                </div>
                            </li>
                            <li>
                                <div className={Style.services_box} data-aos="fade-up" data-aos-once="false">
                                    <span>
                                        <img loading="lazy" src={icon2} alt="icon 2"></img>
                                    </span>
                                    <strong>
                                        <Link to={`/virtual-tooth-cavity-teledental`}>
                                            Dental <br></br> cavities
                                            <small className="d-block"><small className={`btn btn-primary ${Style.services_btn}`}>Learn more</small></small>
                                        </Link></strong>
                                </div>
                            </li>
                            <li>
                                <div className={Style.services_box} data-aos="fade-up" data-aos-once="false">
                                    <span>
                                        <img loading="lazy" src={icon3} alt="icon 3"></img>
                                    </span>
                                    <strong>
                                        <Link to={`/live-teledental-orthodontics-virtual-consult`}>
                                            Orthodontics /
                                            clear aligners
                                            <small className="d-block"><small className={`btn btn-primary ${Style.services_btn}`}>Learn more</small></small>
                                        </Link></strong>
                                </div>
                            </li>
                            <li>
                                <div className={Style.services_box} data-aos="fade-up" data-aos-once="false">
                                    <span>
                                        <img loading="lazy" src={icon4} alt="icon 4"></img>
                                    </span>
                                    <strong>
                                        <Link to={`/local-dental-emergencies-teledental-common-dental-problems-consult`}>
                                        Emergency dental care
                                            <small className="d-block"><small className={`btn btn-primary ${Style.services_btn}`}>Learn more</small></small>
                                        </Link></strong>
                                </div>
                            </li>
                            <li>
                                <div className={Style.services_box} data-aos="fade-up" data-aos-once="false">
                                    <span>
                                        <img loading="lazy" src={icon5} alt="icon 5"></img>
                                    </span>
                                    <strong>
                                        <Link to={`/cosmetic-teledental-dentistry-teledentistry-treatment-information`}>
                                        Cosmetic <br></br> Dentistry
                                            <small className="d-block"><small className={`btn btn-primary ${Style.services_btn}`}>Learn more</small></small>
                                        </Link></strong>
                                </div>
                            </li>
                            <li>
                                <div className={Style.services_box} data-aos="fade-up" data-aos-once="false">
                                    <span>
                                        <img loading="lazy" src={icon6} alt="icon 6"></img>
                                    </span>
                                    <strong>
                                        <Link to={`/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers`}>
                                        Dental <br></br> implants 
                                            <small className="d-block"><small className={`btn btn-primary ${Style.services_btn}`}>Learn more</small></small>
                                        </Link></strong>
                                </div>
                            </li>


                            <li>
                                <div className={Style.services_box} data-aos="fade-up" data-aos-once="false">
                                    <span>
                                        <img loading="lazy" src={icon6} alt="icon 7"></img>
                                    </span>
                                    <strong>
                                        <Link to={`/local-periodontal-questions-about-gum-disease-and-dental-bone-graft-treatment`}>
                                            Periodontal gum info
                                            <small className="d-block"><small className={`btn btn-primary ${Style.services_btn}`}>Learn more</small></small>
                                        </Link></strong>
                                </div>
                            </li>
                            <li>
                                <div className={Style.services_box} data-aos="fade-up" data-aos-once="false">
                                    <span>
                                        <img loading="lazy" src={icon8} alt="icon 8"></img>
                                    </span>
                                    <strong>
                                        <Link to={`/best-teeth-whitening-question-dentist-teledental-dental-veneers-info`}>
                                        Teeth <br></br> whitening
                                            <small className="d-block"><small className={`btn btn-primary ${Style.services_btn}`}>Learn more</small></small>
                                        </Link></strong>
                                </div>
                            </li>
                            <li>
                                <div className={Style.services_box} data-aos="fade-up" data-aos-once="false">
                                    <span>
                                        <img loading="lazy" src={icon9} alt="icon 9"></img>
                                    </span>
                                    <strong>
                                        <Link to={`/local-teledentistry-dental-crown-info-online-teledental-crowns-information`}>
                                        Dental crown <br></br> & veneers
                                            <small className="d-block"><small className={`btn btn-primary ${Style.services_btn}`}>Learn more</small></small>
                                        </Link></strong>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={Style.sr_btn_row}>
                        <Link
                            to="/faqs-question"
                            name="faqs"
                            className="color_white btn_blue"
                        // onClick={() => setIsSignInModalVisible(true)}
                        >
                            Go to FAQ's
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeServices;