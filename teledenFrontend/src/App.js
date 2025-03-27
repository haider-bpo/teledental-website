import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import SocialAuthentication from "./Auth/SocialAuthentication";
import AboutUs from "./Commons/AboutUs/AboutUs";
import BestTeledental from "./Commons/BestTeledental";
import CosmeticDentistry from "./Commons/CosmeticDentistry";
import DentalCrown from "./Commons/DentalCrown";
import DentalEmergencies from "./Commons/DentalEmergencies";
import DentalImplants from "./Commons/DentalImplants";
import DentalStemCell from "./Commons/DentalStemCell";
import PeriodontalQuestions from "./Commons/PeriodontalQuestions";
import Footer from "./Commons/Footer";
import GingivitisAndPeriodental from "./Commons/GingivitisAndPeriodental";
import ToothFracture from "./Commons/ToothFracture";
import VirtualTeleDentistry from "./Commons/VirtualTeleDentistry";
import HelmetComponent from "./Commons/HelmetComponent";
import Inbox from "./Commons/Inbox";
// import LandingPage from "./Commons/LandingPage";
import PaymentForm from "./Commons/PaymentForm";
import Plans from "./Commons/Plans";
import PrivacyPolicy from "./Commons/PrivacyPolicy";
import ScrollToTop from "./Commons/ScrollToTop";
import SiteMap from "./Commons/SiteMap";
import TermsAndConditions from "./Commons/TermsAndConditions";
import {
  default as DentistVideoChat,
  default as PatientVideoChat,
} from "./Commons/VideoChat";
import WhiteningAndVeneers from "./Commons/WhiteningAndVeneers";
import DentistDashboard from "./Dentist/Dashboard";
import IdentityVerification from "./Dentist/IdentityVerification";
import CreateRequest from "./Patient/CreateRequest";
import Dashboard from "./Patient/Dashboard";
import Profile from "./Patient/Profile";
import RequestDetails from "./Patient/RequestDetails";
import DentistRoute from "./Routes/DentistRoute";
import PatientRoute from "./Routes/PatientRoute";
import PublicRoute from "./Routes/PublicRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import WOW from "wowjs";
import AOS from "aos";
import "aos/dist/aos.css";
import LandingPageNew from "./Commons/LandingPageNew";
import DentistSignUp from "./Commons/DentistSignup/DentistSignUp";
import PatientSignUp from "./Commons/PatientSignup/PatientSignUp";
import FaqsQuestion from "./Commons/FaqsQuestion";
import ContactUs from "./Commons/ContactUs/ContactUs";
import JoinUs from "./Commons/JoinUs";
import HowItWorks from "./Commons/HowItWorks";
import ForgotPassword from "./Commons/ForgotPassword";
import ResetPassword from "./Commons/ResetPassword";
import UnApprovedDentist from "./Dentist/UnApprovedDentists";
import HowItWork from "./Dentist/HowItWork";
import UnApprovedAppointments from "./Dentist/UnApprovedAppointments";
import MyAppointments from "./Patient/MyAppointments";
import ConfirmEmailVerification from "./Patient/ConfirmEmailVerification";
import RootCanalTreatment from "./Commons/RootCanalTreatment";
import TeethSensitivityandTeledentalSensitiveTooth from "./Commons/TeethSensitivityAndTeledentalSensitiveTooth";
import OrthodonticsTeledental from "./Commons/OrthodonticsTeledental";
import BestDentistPromo from "./Commons/BestDentistPromo/BestDentistPromo";
import TeledentalAIDentalCare from "./Commons/TeledentalAIDentalCare";
import ToothCavity from "./Commons/ToothCavity";
import LiveDental from "./Commons/LiveDental";
import DentalInsurance from "./Commons/DentalInsurance";
import SignupSuccess from "./Commons/SignupSuccess/SignupSuccess";
import SubscriptionOne from "./Commons/SubscriptionOne";
import SubscriptionSecond from "./Commons/SubscriptionSecond";
import VideoDentalExam from "./Commons/VideoDentalExam";
import VPAT from "./Commons/VPAT";
import AgoraInformation from "./Commons/AgoraInformation";
import SleepOralHealth from "./Commons/SleepOralHealth";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 200,
      easing: "ease-in-out",
      delay: 50,

      // offset: 400,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <HelmetComponent
          title="Teledental"
          name="Teledental"
          content="Teledental"
        />
        <Switch>
          <Elements stripe={stripePromise}>
            {/* <PublicRoute
              exact
              path="/"
              component={LandingPage}
              restrictIfDentistIsNotActivated
            /> */}
            <PublicRoute
              exact
              path="/"
              component={LandingPageNew}
              restrictIfDentistIsNotActivated
            />
            <PublicRoute
              exact
              path="/patient-signup"
              component={PatientSignUp}
              restrictIfDentistIsNotActivated
            />
            <PublicRoute
              exact
              path="/verification-success/:email"
              component={SignupSuccess}
            />
            <PublicRoute
              exact
              path="/dentist-signup"
              component={DentistSignUp}
              restrictIfDentistIsNotActivated
            />
            <PublicRoute
              exact
              path="/faqs-question"
              component={FaqsQuestion}
              restrictIfDentistIsNotActivated
            />
            <PublicRoute
              exact
              path="/contact-us"
              component={ContactUs}
              restrictIfDentistIsNotActivated
            />
            <PublicRoute
              exact
              path="/auth/callback"
              component={SocialAuthentication}
            />
            <PublicRoute
              exact
              path="/cosmetic-teledental-dentistry-teledentistry-treatment-information"
              component={CosmeticDentistry}
            />
            <PublicRoute
              path="/:userType/forgot-password"
              component={ForgotPassword}
            />
            <PublicRoute
              exact
              path="/reset-password"
              component={ResetPassword}
            />
            <PublicRoute
              exact
              path="/local-dental-emergencies-teledental-common-dental-problems-consult"
              component={DentalEmergencies}
            />
            <PublicRoute
              exact
              path="/local-gingivitis-teledental-periodontal-information-periodontist-consult"
              component={GingivitisAndPeriodental}
            />
            <PublicRoute
              exact
              path="/tooth-fracture-consult"
              component={ToothFracture}
            />

            <PublicRoute
              exact
              path="/join-virtual-tele-dental-care"
              component={VirtualTeleDentistry}
            />
            <PublicRoute
              exact
              path="/sleep-wellness-virtual-dental-care"
              component={SleepOralHealth}
            />
            <PublicRoute
              exact
              path="/best-teledental-care-local-teledentist-office-information"
              component={BestTeledental}
            />
            <PublicRoute
              exact
              path="/local-teledentistry-dental-crown-info-online-teledental-crowns-information"
              component={DentalCrown}
            />
            <PublicRoute
              exact
              path="/live-teledental-orthodontics-virtual-consult"
              component={OrthodonticsTeledental}
            />
            <PublicRoute
              exact
              path="/virtual-teledental-root-canal-treatment-info"
              component={RootCanalTreatment}
            />
            <PublicRoute
              exact
              path="/best-dentist-promo"
              component={BestDentistPromo}
            />
            <PublicRoute
              exact
              path="/live-dentist-ai-teledental"
              component={TeledentalAIDentalCare}
            />
            <PublicRoute
              exact
              path="/virtual-tooth-cavity-teledental"
              component={ToothCavity}
            />
            <PublicRoute
              exact
              path="/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers"
              component={DentalImplants}
            />
            <PublicRoute
              exact
              path="/best-teeth-whitening-question-dentist-teledental-dental-veneers-info"
              component={WhiteningAndVeneers}
            />
            <PublicRoute
              exact
              path="/local-teledental-stem-cells-dentistry-care-information"
              component={DentalStemCell}
            />
            <PublicRoute
              exact
              path="/local-periodontal-questions-about-gum-disease-and-dental-bone-graft-treatment"
              component={PeriodontalQuestions}
            />
            <PublicRoute
              exact
              path="/terms-and-conditions"
              component={TermsAndConditions}
            />
            <PublicRoute
              exact
              path="/best-live-dentist-video-about-us "
              component={AboutUs}
            />
            <PublicRoute exact path="/join-us" component={JoinUs} />
            <PublicRoute exact path="/how-it-works" component={HowItWorks} />
            <PublicRoute
              exact
              path="/privacy-policy-teledental"
              component={PrivacyPolicy}
            />
            <PublicRoute exact path="/sitemap" component={SiteMap} />
            <PublicRoute exact path="/email-verified" component={ConfirmEmailVerification} />
            <PublicRoute
              exact
              path="/teeth-sensitivity-and-teledental-sensitive-tooth"
              component={TeethSensitivityandTeledentalSensitiveTooth}
            />
            <PublicRoute
              exact
              path="/dental-implant-information"
              component={LiveDental}
            />
            <PublicRoute
              exact
              path="/video-dental-exams"
              component={VideoDentalExam}
            />
            <PublicRoute
              exact
              path="/voluntary-product-accessibility-template"
              component={VPAT}
            />
            <PublicRoute
              exact
              path="/dental-insurance"
              component={DentalInsurance}
            />
            <PublicRoute
              exact
              path="/best-teledental-dentists-sign-up-subscription-one"
              component={SubscriptionOne}
            />
            <PublicRoute
              exact
              path="/dental-office-sign-up-teledental-subscription"
              component={SubscriptionSecond}
            />
            <PublicRoute
              exact
              path="/agora-info"
              component={AgoraInformation}
            />
            <PatientRoute
              exact
              path="/patients/create-request"
              component={CreateRequest}
            />
            <PatientRoute
              exact
              path="/patients/dashboard"
              component={Dashboard}
            />
            <PatientRoute
              exact
              path="/patients/request/:id"
              component={RequestDetails}
            />
            <PatientRoute
              exact
              path="/patients/messages/:id?"
              component={Inbox}
            />
            <PatientRoute exact path="/patients/profile" component={Profile} />
            <PatientRoute
              exact
              path="/patients/video-chat/:id"
              component={PatientVideoChat}
            />
            <PatientRoute
              exact
              path="/patients/payment-form"
              component={PaymentForm}
            />
            <PatientRoute exact path="/patients/plans" component={Plans} />
            <PatientRoute exact path="/patients/myappointments" component={MyAppointments} />
            <DentistRoute
              exact
              path="/dentists/messages/:id?"
              component={Inbox}
            />
            <DentistRoute
              exact
              path="/dentists/request/:id"
              component={RequestDetails}
            />
            <DentistRoute
              exact
              path="/dentists/profile"
              component={DentistDashboard}
            />
            <DentistRoute
              exact
              accountIsActivated={false}
              path="/dentists/identity-verification"
              component={IdentityVerification}
            />
            <DentistRoute
              exact
              path="/dentists/video-chat/:id"
              component={DentistVideoChat}
            />
            <DentistRoute
              exact
              path="/dentists/unapproveddentists"
              component={UnApprovedDentist}
            />
            <DentistRoute
              exact
              path="/dentists/unapprovedappointments"
              component={UnApprovedAppointments}
            />
            <DentistRoute
              exact
              path="/dentists/howitworks"
              component={HowItWork}
            />
          </Elements>
        </Switch>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
