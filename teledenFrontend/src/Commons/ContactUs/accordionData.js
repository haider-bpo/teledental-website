// Data structure for accordion items
const accordionData = {
  mainSections: [
    {
      id: "patients",
      title: "For Patients:",
      content: {
        type: "paragraph",
        text: "At Teledental, we are committed to meeting the growing demand for virtual dental care by providing you with local teledentistry consulting along with the information you need. However, it is important to note that virtual dental care cannot replace the necessary dental treatment you require. Therefore, we recommend visiting your local dentist for dental X-rays and treatment. Want to book a Live Virtual Dentist Consultation on Teledental? ",
        link: {
          text: "Click here to sign up today!",
          to: "/patient-signup",
          isExternal: false,
        },
      },
      style: {
        marginTop: "1rem",
        fontSize: "1.1rem",
        fontWeight: 400,
        fontFamily: "'Inter', sans-serif",
      },
    },
    {
      id: "dentists",
      title: "For Dentists & Dental Businesses:",
      content: {
        type: "complex",
        items: [
          {
            type: "list",
            items: [
              "Join us.",
              "Market with us.",
              "Grow with us.",
              "Teledental is looking to ADD Dentists and Dental professionals to our team.",
              "We are helping dental practices and dentists grow their business. What we offer no other dental marketing company can do.",
              "Add Teledental services to your practice.",
              "Add Dental Chatbot services to your website.",
              "Add your practice to our dental directory listings.",
              "Advisors and accredited investors can contact us, and grow with us.",
              "Dental companies and health care tech businesses can partner with us.",
              "Partnering with AI health care and telemedicine companies.",
              "Working with dental insurance companies.",
              "Dental finance companies can work with us.",
            ],
            style: {
              marginTop: "1rem",
              fontSize: "1.1rem",
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
            },
          },
          {
            type: "paragraph",
            text: "Offer Your Patients a Local Dentist Consultation, A Live Dentist Virtual Visit, Use Teledentistry Consulting Tech and Virtual Dentistry Chat using Teledental Services. ",
            style: {
              marginTop: "1rem",
              fontSize: "1.1rem",
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
            },
          },
          {
            type: "paragraph",
            text: "Visit Teledental dental sign up ",
            link: {
              text: "Teledental.com/dentist-signup",
              href: "https://teledental.com/dentist-signup",
              isExternal: true,
            },
            style: {
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
            },
          },
          {
            type: "paragraph",
            text: "We are looking to Add Dentists to our team, for local dental practices that are looking for new patients. Are you a dentist, dental practice, dental professional, dental company, AI company, telemedicine group, accredited investor, marketing group, social media pro or financial health care company? If so, then you should partner and network with us.",
            style: {
              marginTop: "1rem",
              fontSize: "1.1rem",
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
            },
          },
          {
            type: "span",
            text: "Can email us at ",
            link: {
              text: "Teledental.com",
              href: "https://teledental.com/",
              isExternal: true,
            },
            style: {
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
            },
          },
          {
            type: "span",
            text: " for more Teledental Service and Live Teledentistry information. ",
            style: {
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
            },
          },
        ],
      },
    },
  ],

  // Collapsible sections
  collapsibleSections: [
    {
      id: "aiDental",
      title: "AI Dental Care Chat, Virtual Teledentistry Technology",
      content:
        "Dentists and dental professionals can join our Teledental team. Our Live Teledentistry Dental Patient Help Tools in real-time can help dental practice grow. Teledental offers unique teledental and dental chat technologies for your dental office. We are looking for dentists and dental professionals to partner with us. We welcome partnerships with dental companies, tech companies, and accredited investors.",
    },
    {
      id: "officeServices",
      title: "Add Teledental Office Services and Partner With Us:",
      content:
        "To join us or invest in what we do at Teledental.com, fill out the form above or contact us via email at service@teledental.com for more information.",
      email: "service@teledental.com",
    },
    {
      id: "virtualDentistry",
      title: "Virtual Dentistry and Tele Dental Chatting with Teledental:",
      content:
        "With the advent of new technologies, people can now have a live virtual teledental consultation from anywhere, anytime. Teledental is dedicated to providing online virtual dental care with qualified dentists. Our consultations provide dental suggestions and information with live dental messaging and dental chat with dentists on DentalChat that may be useful for your understanding. However, we emphasize that you should still visit your local dentist for dental treatment and dental digital x-rays.",
    },
    {
      id: "teledentalService",
      title: "Teledental Service for Dental Practices:",
      content:
        "We also offer Teledental services for dental practices. If you're interested in offering Teledental services to your patients, contact us for more information.",
    },
    {
      id: "partnerWithUs",
      title: "Partner with Us:",
      content:
        "If you're a dental professional or company looking to partner with us, this is a great time to do so. We work with DentalChat.com as well. If you only want to chat with a dentist, you can use DentalChat at this link: https://dentalchat.com/. To get in touch with us, email service@teledental.com.",
      links: [
        {
          text: "DentalChat.com",
          href: "https://dentalchat.com/",
        },
        {
          text: "https://dentalchat.com/",
          href: "https://dentalchat.com/",
        },
      ],
      email: "service@teledental.com",
    },
    {
      id: "emergencyDentalCare",
      title: "Emergency Dental Care Through Teledental:",
      content:
        "Experiencing a dental emergency? Teledental provides immediate virtual consultations for urgent dental problems. Our qualified dentists can assess your situation, provide guidance on pain management, and determine if an in-person visit is necessary. This service helps reduce unnecessary emergency room visits and provides quick relief guidance when you need it most. Contact us immediately for emergency dental consultations.",
    },
    {
      id: "insuranceCoverage",
      title: "Insurance Coverage for Teledental Services:",
      content:
        "More dental insurance providers are beginning to cover teledental services. While coverage varies by provider, many insurance companies now recognize the value and efficiency of virtual dental consultations. We can help you understand your coverage options and work with your insurance provider. For specific questions about insurance coverage for our services, please contact us at service@teledental.com.",
      email: "service@teledental.com",
    },
    {
      id: "howTeledentistryWorks",
      title: "How Does a Teledentistry Consultation Work?",
      content:
        "Teledentistry consultations are simple and convenient. First, schedule your virtual visit with one of our qualified dentists. During your appointment, you can discuss your concerns, share photos or videos of your dental issue, and receive professional advice. Our dentists can evaluate your situation, recommend treatment options, prescribe medications if necessary, and determine if an in-person visit is required. All consultations are conducted through secure, HIPAA-compliant video conferencing technology to ensure your privacy.",
    },
  ],
};

export default accordionData;
