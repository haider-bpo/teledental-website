import React from "react";

function SubscriptionOne() {
  return (
    <>
      <div className="heading-text">
        <h1 className="main-heading">Choose your plan</h1>
        <p>Supercharge Your Practice Growth with Our Dental Ecosystem</p>
        <h6>Exclusive platinum membership for dentists</h6>
      </div>
      <div className="cards">
        <div className="card">
          <div className="card-body-header">
            <h6>PRO</h6>
            <h3>$500</h3>
          </div>
          <div className="card-body">
            <div className="directory-listings">Directory listings</div>
            <div className="dental-leads">Get Dental Leads</div>
          </div>
          <div className="purchase">Purchase Plan</div>
        </div>
        <div className="card" id="elite">
          <div className="card-body-header">
            <h6>PRO</h6>
            <h3>$500</h3>
          </div>
          <div className="card-body">
            <div className="directory-listings">Directory listings</div>
            <div className="dental-leads">Get Dental Leads</div>
            <div className="dental-leads">Get Dental Leads</div>
          </div>
          <div className="purchase">Purchase Plan</div>
        </div>
      </div>
      <div className="footer">
        <h6>
          Qualified Dentists & Professionals: Embrace the Future with Us. Be
          Part of the Solution.
        </h6>
        <h6>Contact Us: service@teledental.com</h6>
      </div>
    </>
  );
}

export default SubscriptionOne;
