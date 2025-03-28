import React from "react";
import Style from "./HomeJoinUs.module.css";
import { Link } from "react-router-dom";
import img from "../../assets/img/hm_joinus_img.webp";

function HomeJoinUs() {
  return (
    <section className={Style.jus_main}>
      <div className="autoContent">
        <div className={Style.jus_inner}>
          <div
            className={Style.jus_heading}
            data-aos="fade-top"
            // data-aos-duration="500"
          >
            <h2>
              jOIN US - <span>Teledental</span>
            </h2>
            <p>
              Teledental is adding people to the team, adding dentists, and
              partnering with companies.
            </p>
          </div>
          <div className={Style.jus_content}>
            <div
              className={Style.jus_content_right}
              data-aos="fade-left"
              //   data-aos-duration="500"
            >
              <div className={Style.jus_content_img}>
                <img loading="lazy" src={img} alt="join us" />
              </div>
            </div>
            <div
              className={Style.jus_content_left}
              data-aos="fade-right"
              //   data-aos-duration="500"
            >
              <ul>
                <li>Become a Teledental dentist (FT/PT) Add </li>
                <li>Teledental to your dental practice </li>
                <li>
                  Are you a dental health care company or want to work with us?
                </li>
              </ul>
              <strong>
                Be part of Teledental & help more people smile globally!
              </strong>
              <div className={Style.jus_btn_row}>
                <Link
                  to="/join-virtual-tele-dental-care"
                  name="dentistry"
                  className="color_white btn_blue"
                  // onClick={() => setIsSignInModalVisible(true)}
                >
                  Join and Add Teledental
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeJoinUs;
