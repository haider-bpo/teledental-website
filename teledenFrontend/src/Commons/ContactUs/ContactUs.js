import { useState } from "react";
import Header from "../Header";
import ContactForm from "./ContactForm";
import InfoSection from "./InfoSection";
import AccordionSection from "./AccordionSection";
import PageTitle from "./PageTitle";

const ContactUs = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId],
    });
  };

  return (
    <div className="d-flex flex-column gap-5">
      <Header />

      {/* Contact Form Section */}
      <section className="container py-5">
        <PageTitle />
        <ContactForm />
      </section>

      <InfoSection />

      <AccordionSection
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
    </div>
  );
};

export default ContactUs;
