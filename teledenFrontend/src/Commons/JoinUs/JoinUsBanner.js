import React from "react";

/**
 * Join Us Banner component
 * Displays the teledental team banner with logo
 */
const JoinUsBanner = () => {
  return (
    <div className="join-teledental-banner">
      <div className="banner-content">
        <img
          src="/images/teledental-logo-without-text.png"
          alt="Teledental Icon"
          className="teledental-icon"
        />
        <h2>Join the Teledental Team</h2>
      </div>
    </div>
  );
};

export default JoinUsBanner;
