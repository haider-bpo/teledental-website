import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

/**
 * Reusable Accordion Item component
 *
 * @param {Object} props Component props
 * @param {string} props.title Title of the accordion item
 * @param {React.ReactNode} props.children Content inside the accordion item
 * @param {boolean} props.isExpanded Whether the accordion is expanded
 * @param {Function} props.onToggle Function to toggle expansion state
 * @returns {JSX.Element} AccordionItem component
 */
const AccordionItem = ({ title, children, isExpanded, onToggle }) => {
  return (
    <div className="accordion-item mb-3 border-0 border-bottom pb-3">
      <div
        className="accordion-header d-flex justify-content-between align-items-center"
        onClick={onToggle}
        style={{ cursor: "pointer" }}
      >
        <h3
          className="mb-0"
          style={{
            fontSize: "1.2rem",
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            color: "#000000",
          }}
        >
          {title}
        </h3>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-primary ${isExpanded ? "rotate-180" : ""}`}
          style={{ transition: "transform 0.3s" }}
        />
      </div>

      {isExpanded && <div className="accordion-body pt-3">{children}</div>}
    </div>
  );
};

export default AccordionItem;
