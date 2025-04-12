import React from "react";
import JoinUsBanner from "./JoinUsBanner";
import WhyJoinSection from "./WhyJoinSection";
import WhoShouldJoinSection from "./WhoShouldJoinSection";
import CtaSection from "./CtaSection";
import Header from "../Header";
import JoinUsForm from "./JoinUsForm";

/**
 * Main JoinUs page component
 * Displays the complete Join Us page with all sections
 */
const JoinUs = () => {
  return (
    <div className="d-flex flex-column gap-5">
      <Header />
      <section
        className="container join-us-wrapper py-5 px-3"
        style={{ maxWidth: "1000px" }}
      >
        <div className="text-center mb-4 mt-5">
          <h1 className="join-us-title">
            Become a Part of{" "}
            <span className="text-pink">Our Teledentistry Team</span> Today!
          </h1>
          <p className="join-us-subtitle">
            Transform Your Practice with 24/7 Virtual Dental Care and
            Cutting-Edge Marketing Solutions.
          </p>
        </div>

        <JoinUsForm />

        <JoinUsBanner />

        <WhyJoinSection />

        <WhoShouldJoinSection />

        <CtaSection />
      </section>
    </div>
  );
};

export default JoinUs;
