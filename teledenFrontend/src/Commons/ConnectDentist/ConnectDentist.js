import React from "react";
import Style from "./ConnectDentist.module.css";
import Step from "../Step/Step";
import { useHistory } from "react-router-dom";
import icon1 from "../../../src/assets/img/hiw_step1.svg";
import icon2 from "../../../src/assets/img/hiw_step2.svg";
import icon3 from "../../../src/assets/img/hiw_step3.svg";
import { Link } from "react-router-dom";
function ConnectDentist() {
  const history = useHistory();
  return (
    <div className={Style.mainDiv}>
      {/* <div className={Style.connectDentist_headlines}>
        <div className="autoContent">
          <p data-aos="fade-up" data-aos-once="false" data-aos-duration="700">
            <button
              className={Style.underline_pink}
              onClick={() => history.push("patient-signup")}
            >
              Click here
            </button>
            to start your Teledental consultation
          </p>
        </div>
      </div> */}
      <div className={Style.hiw_list_parent}>
        <div className={`autoContent ${Style.hsa_top_header}`}>
        {/* <h2>How it Works</h2> */}
                        {/* <div className={Style.hsat_devider}></div> */}
                        
          <div className="row">
            <div className="col-md-3 col-sm-12" data-aos="fade-inn" data-aos-once="false" data-aos-offset="50">
              <Step
                title="Step 1"
                description="Complete a simple patient sign-up form."
                
              />
            </div>
            <div className="col-md-3 col-sm-12" data-aos="fade-inn" data-aos-once="false" data-aos-offset="80">
              <Step title="Step 2" description="Make a convenient appointment."  />
            </div>
            <div className="col-md-3 col-sm-12" data-aos="fade-inn" data-aos-once="false" data-aos-offset="100">
              <Step
                title="Step 3"
                description="Make payment." 
              />
            </div>
            <div className="col-md-3 col-sm-12" data-aos="fade-inn" data-aos-once="false" data-aos-offset="100">
              <Step
                title="Step 4"
                description="Start consult with a Live Dentist." 
              />
            </div>
          </div>

          <p><span>Teledental consult</span> - Live dental <span>video</span> consultation with a <span>dentist</span>. <br></br> <Link style={{textDecoration: 'underline', fontWeight: 700, color: '#0071bc'}} to="/patient-signup">Click here</Link>  to start your Teledental consultation.</p>
          <div className={Style.hiw_btn}>
            <Link to="/how-it-works"  name="patient" className="brix---btn-primary w-button btn-edit btn-primary-filled mb-2"
            >
              How it Works 
            </Link>
            {/* <Link to="/patient-signup"  name="patient" className="brix---btn-primary w-button btn-edit btn-primary-filled mb-2"
            >
              Connect to dentist
            </Link> */}
          </div>
        </div>
      </div>

    </div>
  );
}
export default ConnectDentist;
