import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

/**
 * Who Should Join section component
 * Contains expandable accordion items explaining target audience
 */
const WhoShouldJoinSection = () => {
  const [expandedSections, setExpandedSections] = useState({
    licensedDentists: false,
    dentalCompanies: false,
    dentalInsurance: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div
      className="who-should-join-section my-5"
      style={{
        width: "100%",
        maxWidth: "1200px",
        marginLeft: "0",
        paddingRight: "15px",
      }}
    >
      <h3 className="section-title">Who Should Join?</h3>

      <AccordionItem
        title="Licensed Dentists & Dental Professionals"
        isExpanded={expandedSections.licensedDentists}
        onToggle={() => toggleSection("licensedDentists")}
      >
        <p>
          We are looking for licensed dentists and dental professionals to work
          with us from anywhere with flexible hours. Join our team to provide
          virtual dental consultations and expand your reach.
        </p>
      </AccordionItem>

      <AccordionItem
        title="Dental Companies & Marketers"
        isExpanded={expandedSections.dentalCompanies}
        onToggle={() => toggleSection("dentalCompanies")}
      >
        <p>
          Great time for dental companies and professionals to partner with us
          for mutual growth. We offer innovative marketing solutions and
          technology integration for dental practices.
        </p>
      </AccordionItem>

      <AccordionItem
        title="Dental Insurance Groups & Accredited Investors"
        isExpanded={expandedSections.dentalInsurance}
        onToggle={() => toggleSection("dentalInsurance")}
      >
        <p>
          Join us in revolutionizing the dental care industry with innovative
          teledental solutions. We welcome partnerships with dental insurance
          groups and accredited investors looking to be part of the future of
          dental care.
        </p>
      </AccordionItem>
    </div>
  );
};

export default WhoShouldJoinSection;
