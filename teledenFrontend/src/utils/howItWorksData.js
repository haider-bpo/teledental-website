//Dentist
import dentistImg8 from "../assets/img/Dentist/AddChatBot.png";
import dentistImg16 from "../assets/img/Dentist/AnswerPatients.png";
import dentistImg3 from "../assets/img/Dentist/DentistSignUp.png";
import dentistImg5 from "../assets/img/Dentist/DownloadApp.png";
import dentistImg11 from "../assets/img/Dentist/FilterMessage.png";
import dentistImg15 from "../assets/img/Dentist/InitiateVC.png";
import dentistImg2 from "../assets/img/Dentist/ManageProfile (1).png";
import dentistFeatureImg1 from "../assets/img/Dentist/ManageProfile.png";
import dentistImg4 from "../assets/img/Dentist/PushNotif_Mobile.png";
import dentistImg12 from "../assets/img/Dentist/ReviewPatient_Info.png";
import dentistFeatureImg5 from "../assets/img/DentistFeatureImages/AddChatBot.png";
import dentistFeatureImg9 from "../assets/img/DentistFeatureImages/AnswerPatients.png";
import dentistFeatureImg2 from "../assets/img/DentistFeatureImages/DentistSignUp.png";
import dentistFeatureImg4 from "../assets/img/DentistFeatureImages/DownloadApp.png";
import dentistFeatureImg6 from "../assets/img/DentistFeatureImages/FilterMessage.png";
import dentistFeatureImg8 from "../assets/img/DentistFeatureImages/InitiateVC.png";
import dentistFeatureImg3 from "../assets/img/DentistFeatureImages/PushNotif_Mobile.png";
import dentistFeatureImg7 from "../assets/img/DentistFeatureImages/ReviewPatient_Info.png";
//Patient
import patientImg3 from "../assets/img/Patient/CreateNew_Request.png";
import patientImg5 from "../assets/img/Patient/DentistChat.png";
import patientImg4 from "../assets/img/Patient/FindNear_Dentist.png";
import patientImg7 from "../assets/img/Patient/PatientPassword_Reset.png";
import patientImg2 from "../assets/img/Patient/PatientVC (1).png";
import patientFeatureImg1 from "../assets/img/Patient/PatientVC.png";
import patientImg6 from "../assets/img/Patient/RxPrescriptions.png";
import patientFeatureImg2 from "../assets/img/PatientFeatureImages/CreateNew_Request.png";
import patientFeatureImg4 from "../assets/img/PatientFeatureImages/DentistChat.png";
import patientFeatureImg3 from "../assets/img/PatientFeatureImages/FindNear_Dentist.png";
import patientFeatureImg6 from "../assets/img/PatientFeatureImages/PatientPassword_Reset.png";
import patientFeatureImg5 from "../assets/img/PatientFeatureImages/RxPrescriptions.png";

const dentistFeatures = {
  featureTitle: "Dentist Features:",
  features: [
    {
      text: "Manage Profile",
      imageSrc: dentistImg2,
    },
    {
      text: "Dentist Sign up",
      imageSrc: dentistImg3,
    },
    {
      text: "Mobile Push Notification",
      imageSrc: dentistImg4,
    },
    {
      text: "Download Mobile App",
      imageSrc: dentistImg5,
    },
    {
      text: "Filter Message",
      imageSrc: dentistImg11,
    },
    {
      text: "View Post Information",
      imageSrc: dentistImg12,
    },
    {
      text: "Video Consultation",
      imageSrc: dentistImg15,
    },
    {
      text: "Chat with patients",
      imageSrc: dentistImg16,
    },
  ],
};

const dentistTabsList = [
  {
    title: "Manage Profile",
    description: "Completing Profile Information",
    imageSrc: dentistFeatureImg1,
    tips: [
      "Click 'Profile'.",
      "Update your Basic Information and click 'Save and Next'.",
      "Enter Business hours and click 'Save and Next'.",
      "Enter Education and Training information and click 'Save and Next'.",
      "Enter License information and click 'Save and Next'.",
      "Enter Professional Experience information and click 'Save and Next'.",
      "Enter your Specialties Information and click 'Save and Next'.",
      "Enter your Personal Statement and click 'Save and Next'.",
      "Set up information about your ratings and review and click 'Publish'.",
      "Wait for the confirmation.",
    ],
  },
  {
    title: "Dentist Sign up",
    description: "Creating a Dentist account is as easy as 1-2-3.",
    imageSrc: dentistFeatureImg2,
    tips: [
      "Visit Dentalchat.com Dentist sign up page",
      "Click 'Join DentalChat'.",
      "Fill out the registration form.",
      "Click 'Get Started'.",
      "Confirm your package subscription and 'Continue to Payment'.",
      "Review Billing information and click the 'Click here' button to enter your financial information.",
      "You will get a confirmation.",
    ],
  },
  {
    title: "Mobile Push Notification",
    description: "Activating DentalChat's push notifications on mobile device.",
    imageSrc: dentistFeatureImg3,
    tips: [
      "Download the DentalChat application from your iphone or Android mobile device.",
      "Once finished, Click 'Open'.",
      "Click 'Allow' to receive push notifications.",
      "Sign-in as Dentist or Patient.",
    ],
  },
  {
    title: "Download Mobile App",
    description: "Installing DentalChat application on mobile",
    imageSrc: dentistFeatureImg4,
    tips: [
      "Visit: App Store for iphone users. Google Play for android users.",
      "Search 'DentalChat' from the search Bar and click 'Get'.",
      "Once finished, Click 'Open'.",
      "Click 'Allow' to receive push notifications.",
      "Sign-in as Dentist or Patient.",
    ],
  },
  {
    title: "Filter Message",
    description: "Filter chatbot message according to specified criteria",
    imageSrc: dentistFeatureImg6,
    tips: [
      "Click 'Message'",
      "Click the filter icon.",
      "Filter your chatbot leads according to specified criteria.",
    ],
  },
  {
    title: "View Post Information",
    description: "Reviewing patient's request information",
    imageSrc: dentistFeatureImg7,
    tips: [
      "Click 'Message'",
      "Choose patient from the message board.",
      "Click 'View Post Details'.",
      "Review Patient's Information",
    ],
  },
  {
    title: "Video Consultation",
    description:
      "Communicate with patients using video consultation and take notes.",
    imageSrc: dentistFeatureImg8,
    tips: [
      "Click 'Message'",
      "Choose patient from the message screen.",
      "You will receive a notification that someone is requesting for a video consultation.",
      "Click ' Start video consult'.",
      "You'll be routed to a new tab where the video consultation will be conducted.",
    ],
  },
  {
    title: "Chat with patients",
    description:
      "Respond to patient's inquiries and chat with them. You can do this from your DentalChat mobile app or from the web.",
    imageSrc: dentistFeatureImg9,
    tips: [
      "Click 'Message'",
      "Choose the patient from the left side of the message screen.",
      "Type your reply on the space provided below.",
      "Click the blue arrow to send your message.",
    ],
  },
];

const patientFeatures = {
  featureTitle: "Patient Tutorials:",
  features: [
    {
      text: "Request Video Consult",
      imageSrc: patientImg2,
    },
    {
      text: "New Request",
      imageSrc: patientImg3,
    },
    {
      text: "Find Dentist",
      imageSrc: patientImg4,
    },
    {
      text: "Chat with Dentist",
      imageSrc: patientImg5,
    },
    {
      text: "Rx Prescriptions",
      imageSrc: patientImg6,
    },
    {
      text: "Patient Password Reset",
      imageSrc: patientImg7,
    },
  ],
};

const patientTabsList = [
  {
    title: "Request Video Consult",
    description: "Requesting video consultation with a dentist.",
    imageSrc: patientFeatureImg1,
    tips: [
      "Click 'Create New Request'.",
      "On your request, indicate that you want to request for a video consultation.",
      "Click on the link from the message received to proceed with the payment.",
      "Review financial information.",
      "Wait for the confirmation and click 'View Message'.",
      "The dentist will send you another link after the payment is completed.",
      "Click on the link to enter the meeting room.",
    ],
  },
  {
    title: "New Request",
    description: "Submit a new request to Dentist.",
    imageSrc: patientFeatureImg2,
    tips: [
      "Click 'Create New Request'.",
      "Fill in information.",
      "Click 'Submit Request'.",
      "Click the 'Click here to view the Dentist Message'",
    ],
  },
  {
    title: "Find Dentist",
    description: "Search for nearby dentist.",
    imageSrc: patientFeatureImg3,
    tips: [
      "Visit: https://dentalchat.com/dentist-directory",
      "Fill in the needed information on the search bar.",
      "Click 'View Profile'.",
      "Click 'Ask dental question' or 'Book Appointment'.",
    ],
  },
  {
    title: "Chat with Dentist",
    description: "Communicate with dentist",
    imageSrc: patientFeatureImg4,
    tips: [
      "Click 'Message'.",
      "Choose message from the message screen.",
      "Type your response on the space provided.",
      "Click the blue arrow to send message.",
    ],
  },
  {
    title: "Rx Prescriptions",
    description: "Request for Video Consultation with Rx Prescription.",
    imageSrc: patientFeatureImg5,
    tips: [
      "Click 'Create New Request'.",
      "Complete the form and indicate that you want a Video consultation Plus Rx Prescription.",
      "Submit the form.",
      "Wait for the confirmation and click 'Click here to view Message'.",
      "Click the link from the Dentist's message.",
      "Complete the form and proceed with the payment.",
      "Wait for the confirmation and click 'View Message'.",
      "Click the link from the Dentist's message.",
      "Proceed with the video consultation.",
    ],
  },
  {
    title: "Patient Password Reset",
    description: "Reset your forgotten DentalChat patient's account password",
    imageSrc: patientFeatureImg6,
    tips: [
      "Click 'Forgot Password'.",
      "Enter the email address associated with your account.",
      "Click the link that was sent to your email.",
      "Enter New Password.",
      "Wait for the confirmation.",
    ],
  },
];

export { dentistTabsList, patientTabsList, dentistFeatures, patientFeatures };
