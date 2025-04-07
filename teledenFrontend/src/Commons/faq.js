import React, { useState } from "react";

const Faq = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      question:
        "Does a virtual Teledental consultation minimize the need for treatment at my local dentist's office?",
      answer:
        "While virtual consultations can help assess certain conditions and provide initial recommendations, they cannot completely replace in-person treatment for many dental procedures. However, they can help determine if an in-person visit is necessary and prepare you for what to expect.",
    },
    {
      question: "Are we currently providing pain medication?",
      answer:
        "Pain management recommendations may be provided during a virtual consultation, but prescriptions for controlled substances typically require an in-person evaluation according to state regulations. We can discuss over-the-counter options and provide guidance for temporary relief.",
    },
    {
      question: "Do we prescribe dental antibiotics?",
      answer:
        "In some cases, antibiotics may be prescribed during a teledental consultation for certain dental infections. This depends on your symptoms, medical history, and applicable regulations in your state. A follow-up in-person appointment may still be recommended.",
    },
    {
      question:
        "Are the Teledental fees refundable after the virtual consultation?",
      answer:
        "Our refund policy for teledental consultations depends on several factors. Please contact our customer service team for specific information regarding your consultation fees and eligibility for refunds.",
    },
  ];

  return (
    <div className="px-1 my-5 py-5">
      <div className="row gap-2">
        <div className="col-md-4 text-center mb-4">
          <img
            src="/images/faq-logo.png"
            alt="Teledental Logo"
            className="img-fluid mb-3"
          />
          <div className="input-group w-75 mb-3 mx-auto">
            <input
              type="text"
              className="form-control fw-bold"
              placeholder="Search..."
              aria-label="Search"
              style={{
                borderRadius: "10px 0 0 10px",
                border: "1px solid #5A5D62",
                padding: "10px 15px",
                borderRight: "none",
              }}
            />
            <button
              className="btn"
              type="button"
              style={{
                background: "transparent",
                border: "1px solid #5A5D62",
                borderLeft: "none",
                borderRadius: "0 10px 10px 0",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="col-md-7">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-3">
              <div
                className="d-flex justify-content-between align-items-center p-3"
                style={{
                  borderBottom: "1px solid #dee2e6",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={() => toggleItem(index)}
              >
                <h5 className="mb-0 faq">{item.question}</h5>
                <span style={{ fontSize: "24px" }}>
                  {openItem === index ? "−" : "+"}
                </span>
              </div>

              {openItem === index && (
                <div className="p-3">
                  <p className="faq">{item.answer}</p>
                </div>
              )}
            </div>
          ))}

          <div className="text-start mt-5">
            <button
              className="btn blue_btn px-4 py-2"
              style={{
                backgroundColor: "#0078BE",
                borderColor: "#0078BE",
              }}
            >
              Find More Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
