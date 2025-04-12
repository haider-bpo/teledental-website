import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

/**
 * Why Join Teledental section component
 * Contains expandable accordion items explaining benefits
 */
const WhyJoinSection = () => {
  const [expandedSections, setExpandedSections] = useState({
    aiDental: false,
    officeServices: false,
    virtualDentistry: false,
    teledentalService: false,
    partnerWithUs: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div
      className="why-join-section my-5"
      style={{
        width: "100%",
        maxWidth: "1200px",
        marginLeft: "0",
        paddingRight: "15px",
      }}
    >
      <h3 className="section-title">Why Join Teledental?</h3>

      <AccordionItem
        title="AI Dental Care Chat, Virtual Teledentistry Technology"
        isExpanded={expandedSections.aiDental}
        onToggle={() => toggleSection("aiDental")}
      >
        <p>
          Dentists and dental professionals can join our Teledental team. Our
          Live Teledentistry Dental Patient Help Tools in real-time can help
          dental practice grow. Teledental offers unique teledental and dental
          chat technologies for your dental office. We are looking for dentists
          and dental professionals to partner with us. We welcome partnerships
          with dental companies, tech companies, and accredited investors.
        </p>
      </AccordionItem>

      <AccordionItem
        title="Add Teledental Office Services and Partner With Us:"
        isExpanded={expandedSections.officeServices}
        onToggle={() => toggleSection("officeServices")}
      >
        <p>
          To join us or invest in what we do at Teledental.com, fill out the
          form above or contact us via email at{" "}
          <a href="mailto:service@teledental.com" className="text-primary">
            service@teledental.com
          </a>{" "}
          for more information.
        </p>
      </AccordionItem>

      <AccordionItem
        title="Virtual Dentistry and Tele Dental Chatting with Teledental:"
        isExpanded={expandedSections.virtualDentistry}
        onToggle={() => toggleSection("virtualDentistry")}
      >
        <p>
          With the advent of new technologies, people can now have a live
          virtual teledental consultation from anywhere, anytime. Teledental is
          dedicated to providing online virtual dental care with qualified
          dentists. Our consultations provide dental suggestions and information
          with live dental messaging and dental chat with dentists on DentalChat
          that may be useful for your understanding. However, we emphasize that
          you should still visit your local dentist for dental treatment and
          dental digital x-rays.
        </p>
      </AccordionItem>

      <AccordionItem
        title="Teledental Service for Dental Practices:"
        isExpanded={expandedSections.teledentalService}
        onToggle={() => toggleSection("teledentalService")}
      >
        <p>
          We also offer Teledental services for dental practices. If you're
          interested in offering Teledental services to your patients, contact
          us for more information.
        </p>
      </AccordionItem>

      <AccordionItem
        title="Partner with Us:"
        isExpanded={expandedSections.partnerWithUs}
        onToggle={() => toggleSection("partnerWithUs")}
      >
        <p>
          If you're a dental professional or company looking to partner with us,
          this is a great time to do so. We work with{" "}
          <a href="https://dentalchat.com/" className="text-primary">
            DentalChat.com
          </a>{" "}
          as well. If you only want to chat with a dentist, you can use
          DentalChat at this link:{" "}
          <a href="https://dentalchat.com/" className="text-primary">
            https://dentalchat.com/
          </a>
          . To get in touch with us, email{" "}
          <a href="mailto:service@teledental.com" className="text-primary">
            service@teledental.com
          </a>
          .
        </p>
      </AccordionItem>
    </div>
  );
};

export default WhyJoinSection;
