import { createContext, useContext } from "react";

const MetadataContext = createContext();

export const MetadataProvider = ({ children }) => {
  const metadata = {
    "/": {
      title: "Your Trusted Teledental Care | TeleDental Services",
      description:
        "Experience seamless virtual dental care with TeleDental. Book online consultations for all your dental needs today!",
      canonicalUrl: "https://teledental.com/",
    },
    "/patient-signup": {
      title: "Patient Signup | Join TeleDental Virtual Care",
      description:
        "Sign up for seamless virtual dental care. Create your TeleDental patient account to book online consultations with dental experts.",
      canonicalUrl: "https://teledental.com/patient-signup",
    },
    "/best-live-dentist-video-about-us": {
      title: "About TeleDental | Transforming Virtual Dentistry",
      description:
        "Learn about TeleDental's mission to revolutionize dental care. Join us in providing accessible, innovative teledental solutions.",
      canonicalUrl: "https://teledental.com/best-live-dentist-video-about-us",
    },
    "/contact-us": {
      title: "Contact TeleDental | Reach Out for Dental Care",
      description:
        "Have questions? Contact TeleDental for expert support in teledental services. Get answers today—connect with us now!",
      canonicalUrl: "https://teledental.com/contact-us",
    },
    "/faqs-question": {
      title: "FAQ | TeleDental Teledental Services Explained",
      description:
        "Get answers to all your questions about teledental services with TeleDental. Explore our FAQ section for quick solutions.",
      canonicalUrl: "https://teledental.com/faqs-question",
    },
    "/join-us": {
      title: "Join TeleDental | Partner with Us for Teledental Services",
      description:
        "Dentists and companies, partner with TeleDental to expand your reach. Join our platform and grow your practice virtually.",
      canonicalUrl: "https://teledental.com/join-us",
    },
    "/cosmetic-teledental-dentistry-teledentistry-treatment-information": {
      title: "Cosmetic Dentistry Info | Enhance Your Smile Virtually",
      description:
        "Discover cosmetic dentistry solutions with TeleDental. Learn how virtual consultations can transform your smile today!",
      canonicalUrl:
        "https://teledental.com/cosmetic-teledental-dentistry-teledentistry-treatment-information",
    },
    "/local-dental-emergencies-teledental-common-dental-problems-consult": {
      title: " Handle Dental Emergencies Virtually | TeleDental Help",
      description:
        "Get instant advice for dental emergencies from TeleDental. Connect with our experts for care anytime, anywhere.",
      canonicalUrl:
        "https://teledental.com/local-dental-emergencies-teledental-common-dental-problems-consult",
    },
    "/local-gingivitis-teledental-periodontal-information-periodontist-consult":
      {
        title: "Gingivitis & Gum Care | TeleDental Periodontal Info",
        description:
          "Understand and manage gingivitis with TeleDental. Learn about gum health and periodontal care through virtual consultations.",
        canonicalUrl:
          "https://teledental.com/local-gingivitis-teledental-periodontal-information-periodontist-consult",
      },
    "/best-teledental-care-local-teledentist-office-information": {
      title: "Best Teledental Care | TeleDental Virtual Services",
      description:
        "Discover the best teledentistry services with TeleDental. Access expert care and information from the comfort of your home!",
      canonicalUrl:
        "https://teledental.com/best-teledental-care-local-teledentist-office-information",
    },
    "/local-teledentistry-dental-crown-info-online-teledental-crowns-information":
      {
        title: "Dental Crowns & Veneers Info | TeleDental Care",
        description:
          "Learn about dental crowns and veneers with TeleDental. Book virtual consultations to explore your options today!",
        canonicalUrl:
          "https://teledental.com/local-teledentistry-dental-crown-info-online-teledental-crowns-information",
      },
    "/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers":
      {
        title: "Dental Implant Info Online | TeleDental Services",
        description:
          "Explore teledental implant solutions with TeleDental. Learn about your options and get expert guidance virtually.",
        canonicalUrl:
          "https://teledental.com/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers",
      },
    "/live-teledental-orthodontics-virtual-consult": {
      title: "Orthodontics & Aligners Info | TeleDental Care",
      description:
        "Discover orthodontics and clear aligners solutions with TeleDental. Virtual consultations for your perfect smile await!",
      canonicalUrl:
        "https://teledental.com/live-teledental-orthodontics-virtual-consult",
    },
    "/live-dentist-ai-teledental": {
      title: "AI-Powered Teledental Care | TeleDental Solutions",
      description:
        "Experience the future of dentistry with AI and TeleDental. Book a consultation to explore innovative teledental services!",
      canonicalUrl: "https://teledental.com/live-dentist-ai-teledental",
    },
    "/virtual-tooth-cavity-teledental": {
      title: "Tooth Cavity Info Online | TeleDental Services",
      description:
        "Learn about tooth cavities and their treatment through TeleDental. Schedule a virtual consultation for expert advice today!",
      canonicalUrl: "https://teledental.com/virtual-tooth-cavity-teledental",
    },
    "/sleep-wellness-virtual-dental-care": {
      title: "Sleep Wellness Dentistry | TeleDental Virtual Care",
      description:
        "Address sleep-related dental issues with TeleDental. Virtual consultations for sleep wellness dentistry await!",
      canonicalUrl: "https://teledental.com/sleep-wellness-virtual-dental-care",
    },
    "/best-teeth-whitening-question-dentist-teledental-dental-veneers-info": {
      title: "Teeth Whitening & Veneers | TeleDental Services",
      description:
        "Brighten your smile with teeth whitening and veneers. Explore virtual consultations with TeleDental today!",
      canonicalUrl:
        "https://teledental.com/best-teeth-whitening-question-dentist-teledental-dental-veneers-info",
    },
    "/local-teledental-stem-cells-dentistry-care-information": {
      title: "Dental Stem Cell Info | TeleDental Virtual Guidance",
      description:
        "Learn about dental stem cell technology and its benefits with TeleDental. Book a virtual consultation for expert advice!",
      canonicalUrl:
        "https://teledental.com/local-teledental-stem-cells-dentistry-care-information",
    },
    "/cosmetic-teledental-dentistry-teledentistry-treatment-information": {
      title: "Cosmetic Dentistry Online | TeleDental Care",
      description:
        "Enhance your smile with cosmetic dentistry from TeleDental. Book your virtual consultation and transform your look today!",
      canonicalUrl:
        "https://teledental.com/cosmetic-teledental-dentistry-teledentistry-treatment-information",
    },
    "/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers":
      {
        title: "Dental Implants Online | TeleDental Virtual Services",
        description:
          "Explore dental implant options with TeleDental. Schedule your virtual consultation to regain your perfect smile!",
        canonicalUrl:
          "https://teledental.com/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers",
      },
    "/tooth-fracture-consult": {
      title: "Tooth Fracture Help | TeleDental Virtual Care",
      description:
        "Learn how to handle tooth fractures with TeleDental. Book a consultation for expert care today!",
      canonicalUrl: "https://teledental.com/tooth-fracture-consult",
    },
    "/local-periodontal-questions-about-gum-disease-and-dental-bone-graft-treatment":
      {
        title: "Periodontal & Bone Graft Info | TeleDental Care",
        description:
          "Address gum disease and bone graft concerns with TeleDental. Get virtual consultations and expert advice online!",
        canonicalUrl:
          "https://teledental.com/local-periodontal-questions-about-gum-disease-and-dental-bone-graft-treatment",
      },
    "/virtual-teledental-root-canal-treatment-info": {
      title: "Root Canal Info Online | TeleDental Virtual Care",
      description:
        "Learn about root canal treatments with TeleDental. Book a virtual consultation for expert guidance and care today!",
      canonicalUrl:
        "https://teledental.com/virtual-teledental-root-canal-treatment-info",
    },
    "/virtual-teledental-root-canal-treatment-info": {
      title: "Root Canal Info Online | TeleDental Virtual Care",
      description:
        "Learn about root canal treatments with TeleDental. Book a virtual consultation for expert guidance and care today!",
      canonicalUrl:
        "https://teledental.com/virtual-teledental-root-canal-treatment-info",
    },
    "/teeth-sensitivity-and-teledental-sensitive-tooth": {
      title: "Teeth Sensitivity Care | TeleDental Virtual Services",
      description:
        "Address teeth sensitivity with TeleDental's virtual consultations. Get expert advice and care for your sensitive teeth today!",
      canonicalUrl:
        "https://teledental.com/teeth-sensitivity-and-teledental-sensitive-tooth",
    },
    "/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers":
      {
        title: "Dental Implant Q&A | TeleDental Live Guidance",
        description:
          "Join TeleDental for live dental implant Q&A sessions. Book now for instant expert answers and personalized care!",
        canonicalUrl:
          "https://teledental.com/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers",
      },
    "/dental-insurance": {
      title: "Dental Insurance Help | TeleDental Plans Explained",
      description:
        " Learn about dental insurance and plans with TeleDental. Explore affordable options with our expert virtual guidance!",
      canonicalUrl: "https://teledental.com/dental-insurance",
    },
  };
  //
  return (
    <MetadataContext.Provider value={metadata}>
      {children}
    </MetadataContext.Provider>
  );
};

export const useMetadata = () => useContext(MetadataContext);
