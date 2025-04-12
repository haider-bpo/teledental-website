import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import accordionData from "./accordionData";

const AccordionSection = ({ expandedSections, toggleSection }) => {
  // Helper function to render paragraph content with optional link
  const renderParagraph = (content, style) => {
    if (!content.link) {
      return <p style={style}>{content.text}</p>;
    }

    return (
      <p style={style}>
        {content.text}
        {content.link.isExternal ? (
          <a href={content.link.href} className="text-primary">
            {content.link.text}
          </a>
        ) : (
          <Link to={content.link.to} className="text-primary">
            {content.link.text}
          </Link>
        )}
      </p>
    );
  };

  // Helper function to render list items
  const renderList = (items, style) => {
    return (
      <ul className="list-unstyled" style={style}>
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            • {item}
          </li>
        ))}
      </ul>
    );
  };

  // Helper function to render span with optional link
  const renderSpan = (content) => {
    if (!content.link) {
      return <span style={content.style}>{content.text}</span>;
    }

    return (
      <span style={content.style}>
        {content.text}
        <a href={content.link.href} className="text-primary">
          {content.link.text}
        </a>
      </span>
    );
  };

  // Helper function to render complex content (mix of paragraphs, lists, spans)
  const renderComplexContent = (content) => {
    return content.items.map((item, index) => {
      switch (item.type) {
        case "paragraph":
          return (
            <React.Fragment key={index}>
              {renderParagraph(item, item.style)}
            </React.Fragment>
          );
        case "list":
          return (
            <React.Fragment key={index}>
              {renderList(item.items, item.style)}
            </React.Fragment>
          );
        case "span":
          return (
            <React.Fragment key={index}>{renderSpan(item)}</React.Fragment>
          );
        default:
          return null;
      }
    });
  };

  // Helper function to render main section content
  const renderMainSectionContent = (section) => {
    const { content } = section;

    if (content.type === "paragraph") {
      return renderParagraph(content, section.style);
    } else if (content.type === "complex") {
      return renderComplexContent(content);
    }

    return null;
  };

  // Helper function to render collapsible section content
  const renderCollapsibleContent = (section) => {
    let content = <p>{section.content}</p>;

    // Add email link if available
    if (section.email) {
      content = (
        <p>
          {section.content.replace(section.email, "")}
          <a href={`mailto:${section.email}`} className="text-primary">
            {section.email}
          </a>
          {section.content.includes("for more information")
            ? " for more information."
            : ""}
        </p>
      );
    }

    // Add links if available
    if (section.links) {
      const linkElements = section.links.map((link, index) => (
        <a key={index} href={link.href} className="text-primary">
          {link.text}
        </a>
      ));

      content = (
        <p>
          {section.content.split("DentalChat.com")[0]}
          {linkElements[0]}
          {
            section.content
              .split("DentalChat.com")[1]
              .split("https://dentalchat.com/")[0]
          }
          {linkElements[1]}
          {
            section.content
              .split("https://dentalchat.com/")[1]
              .split(section.email)[0]
          }
          <a href={`mailto:${section.email}`} className="text-primary">
            {section.email}
          </a>
          .
        </p>
      );
    }

    return content;
  };

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          {/* Main Sections */}
          {accordionData.mainSections.map((section) => (
            <div
              key={section.id}
              className="accordion-item mb-3 border-0 border-bottom pb-3"
            >
              <div
                className="accordion-header d-flex justify-content-between align-items-center"
                onClick={() => toggleSection(section.id)}
                style={{ cursor: "pointer" }}
              >
                <h3 className="fw-bold text-primary mb-0">{section.title}</h3>
              </div>

              {renderMainSectionContent(section)}
            </div>
          ))}

          {/* Collapsible Sections Header */}
          <h3 className="fw-bold text-primary mb-0 mt-5 mb-3">
            Find Out More:
          </h3>

          {/* Collapsible Sections */}
          {accordionData.collapsibleSections.map((section) => (
            <div
              key={section.id}
              className="accordion-item mb-3 border-0 border-bottom pb-3"
            >
              <div
                className="accordion-header d-flex justify-content-between align-items-center"
                onClick={() => toggleSection(section.id)}
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
                  {section.title}
                </h3>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={` ${
                    expandedSections[section.id] ? "rotate-180" : ""
                  }`}
                  style={{ transition: "transform 0.3s" }}
                />
              </div>

              {expandedSections[section.id] && (
                <div className="accordion-body pt-3">
                  {renderCollapsibleContent(section)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
