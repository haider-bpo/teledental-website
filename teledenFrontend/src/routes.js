import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense } from "react";
import "aos/dist/aos.css";

// Non-lazy loaded components (used immediately or small in size)
import ScrollToTop from "./Commons/ScrollToTop";
import Footer from "./Commons/Footer";
import DentistRoute from "./Routes/DentistRoute";
import PatientRoute from "./Routes/PatientRoute";
import PublicRoute from "./Routes/PublicRoute";
import withMetaData from "./Commons/withMetaData";

// Lazy loaded components
const SocialAuthentication = lazy(() => import("./Auth/SocialAuthentication"));
const AboutUs = lazy(() => import("./Commons/AboutUs/AboutUs"));
const BestTeledental = lazy(() => import("./Commons/BestTeledental"));
const CosmeticDentistry = lazy(() => import("./Commons/CosmeticDentistry"));
const DentalCrown = lazy(() => import("./Commons/DentalCrown"));
const DentalEmergencies = lazy(() => import("./Commons/DentalEmergencies"));
const DentalImplants = lazy(() => import("./Commons/DentalImplants"));
const DentalStemCell = lazy(() => import("./Commons/DentalStemCell"));
const PeriodontalQuestions = lazy(() =>
  import("./Commons/PeriodontalQuestions")
);
const GingivitisAndPeriodental = lazy(() =>
  import("./Commons/GingivitisAndPeriodental")
);
const ToothFracture = lazy(() => import("./Commons/ToothFracture"));
const VirtualTeleDentistry = lazy(() =>
  import("./Commons/VirtualTeleDentistry")
);
const Inbox = lazy(() => import("./Commons/Inbox"));
// const LandingPage = lazy(() => import("./Commons/LandingPage"));
const PaymentForm = lazy(() => import("./Commons/PaymentForm"));
const Plans = lazy(() => import("./Commons/Plans"));
const PrivacyPolicy = lazy(() => import("./Commons/PrivacyPolicy"));
const SiteMap = lazy(() => import("./Commons/SiteMap"));
const TermsAndConditions = lazy(() => import("./Commons/TermsAndConditions"));
const VideoChat = lazy(() => import("./Commons/VideoChat"));
const DentistVideoChat = VideoChat;
const PatientVideoChat = VideoChat;
const WhiteningAndVeneers = lazy(() => import("./Commons/WhiteningAndVeneers"));
const DentistDashboard = lazy(() => import("./Dentist/Dashboard"));
const IdentityVerification = lazy(() =>
  import("./Dentist/IdentityVerification")
);
const CreateRequest = lazy(() => import("./Patient/CreateRequest"));
const Dashboard = lazy(() => import("./Patient/Dashboard"));
const Profile = lazy(() => import("./Patient/Profile"));
const RequestDetails = lazy(() => import("./Patient/RequestDetails"));
const LandingPageNew = lazy(() => import("./Commons/LandingPageNew"));
const DentistSignUp = lazy(() =>
  import("./Commons/DentistSignup/DentistSignUp")
);
const PatientSignUp = lazy(() =>
  import("./Commons/PatientSignup/PatientSignUp")
);
const FaqsQuestion = lazy(() => import("./Commons/FaqsQuestion"));
const ContactUs = lazy(() => import("./Commons/ContactUs/ContactUs"));
const JoinUs = lazy(() => import("./Commons/JoinUs"));
const HowItWorks = lazy(() => import("./Commons/HowItWorks"));
const ForgotPassword = lazy(() => import("./Commons/ForgotPassword"));
const ResetPassword = lazy(() => import("./Commons/ResetPassword"));
const UnApprovedDentist = lazy(() => import("./Dentist/UnApprovedDentists"));
const HowItWork = lazy(() => import("./Dentist/HowItWork"));
const UnApprovedAppointments = lazy(() =>
  import("./Dentist/UnApprovedAppointments")
);
const MyAppointments = lazy(() => import("./Patient/MyAppointments"));
const ConfirmEmailVerification = lazy(() =>
  import("./Patient/ConfirmEmailVerification")
);
const RootCanalTreatment = lazy(() => import("./Commons/RootCanalTreatment"));
const TeethSensitivityandTeledentalSensitiveTooth = lazy(() =>
  import("./Commons/TeethSensitivityAndTeledentalSensitiveTooth")
);
const OrthodonticsTeledental = lazy(() =>
  import("./Commons/OrthodonticsTeledental")
);
const BestDentistPromo = lazy(() =>
  import("./Commons/BestDentistPromo/BestDentistPromo")
);
const TeledentalAIDentalCare = lazy(() =>
  import("./Commons/TeledentalAIDentalCare")
);
const ToothCavity = lazy(() => import("./Commons/ToothCavity"));
const LiveDental = lazy(() => import("./Commons/LiveDental"));
const DentalInsurance = lazy(() => import("./Commons/DentalInsurance"));
const SignupSuccess = lazy(() =>
  import("./Commons/SignupSuccess/SignupSuccess")
);
const SubscriptionOne = lazy(() => import("./Commons/SubscriptionOne"));
const SubscriptionSecond = lazy(() => import("./Commons/SubscriptionSecond"));
const VideoDentalExam = lazy(() => import("./Commons/VideoDentalExam"));
const VPAT = lazy(() => import("./Commons/VPAT"));
const AgoraInformation = lazy(() => import("./Commons/AgoraInformation"));
const SleepOralHealth = lazy(() => import("./Commons/SleepOralHealth"));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Loading fallback component
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function AppRouter() {
  return (
    <Router>
      <ScrollToTop>
        <Suspense fallback={<LoadingFallback />}>
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
                component={withMetaData(LandingPageNew)}
                restrictIfDentistIsNotActivated
              />
              <PublicRoute
                exact
                path="/patient-signup"
                component={withMetaData(PatientSignUp)}
                restrictIfDentistIsNotActivated
              />
              <PublicRoute
                exact
                path="/verification-success/:email"
                component={withMetaData(SignupSuccess)}
              />
              <PublicRoute
                exact
                path="/dentist-signup"
                component={withMetaData(DentistSignUp)}
                restrictIfDentistIsNotActivated
              />
              <PublicRoute
                exact
                path="/faqs-question"
                component={withMetaData(FaqsQuestion)}
                restrictIfDentistIsNotActivated
              />
              <PublicRoute
                exact
                path="/contact-us"
                component={withMetaData(ContactUs)}
                restrictIfDentistIsNotActivated
              />
              <PublicRoute
                exact
                path="/auth/callback"
                component={withMetaData(SocialAuthentication)}
              />
              <PublicRoute
                exact
                path="/cosmetic-teledental-dentistry-teledentistry-treatment-information"
                component={withMetaData(CosmeticDentistry)}
              />
              <PublicRoute
                path="/:userType/forgot-password"
                component={withMetaData(ForgotPassword)}
              />
              <PublicRoute
                exact
                path="/reset-password"
                component={withMetaData(ResetPassword)}
              />
              <PublicRoute
                exact
                path="/local-dental-emergencies-teledental-common-dental-problems-consult"
                component={withMetaData(DentalEmergencies)}
              />
              <PublicRoute
                exact
                path="/local-gingivitis-teledental-periodontal-information-periodontist-consult"
                component={withMetaData(GingivitisAndPeriodental)}
              />
              <PublicRoute
                exact
                path="/tooth-fracture-consult"
                component={withMetaData(ToothFracture)}
              />

              <PublicRoute
                exact
                path="/join-virtual-tele-dental-care"
                component={withMetaData(VirtualTeleDentistry)}
              />
              <PublicRoute
                exact
                path="/sleep-wellness-virtual-dental-care"
                component={withMetaData(SleepOralHealth)}
              />
              <PublicRoute
                exact
                path="/best-teledental-care-local-teledentist-office-information"
                component={withMetaData(BestTeledental)}
              />
              <PublicRoute
                exact
                path="/local-teledentistry-dental-crown-info-online-teledental-crowns-information"
                component={withMetaData(DentalCrown)}
              />
              <PublicRoute
                exact
                path="/live-teledental-orthodontics-virtual-consult"
                component={withMetaData(OrthodonticsTeledental)}
              />
              <PublicRoute
                exact
                path="/virtual-teledental-root-canal-treatment-info"
                component={withMetaData(RootCanalTreatment)}
              />
              <PublicRoute
                exact
                path="/best-dentist-promo"
                component={withMetaData(BestDentistPromo)}
              />
              <PublicRoute
                exact
                path="/live-dentist-ai-teledental"
                component={withMetaData(TeledentalAIDentalCare)}
              />
              <PublicRoute
                exact
                path="/virtual-tooth-cavity-teledental"
                component={withMetaData(ToothCavity)}
              />
              <PublicRoute
                exact
                path="/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers"
                component={withMetaData(DentalImplants)}
              />
              <PublicRoute
                exact
                path="/best-teeth-whitening-question-dentist-teledental-dental-veneers-info"
                component={withMetaData(WhiteningAndVeneers)}
              />
              <PublicRoute
                exact
                path="/local-teledental-stem-cells-dentistry-care-information"
                component={withMetaData(DentalStemCell)}
              />
              <PublicRoute
                exact
                path="/local-periodontal-questions-about-gum-disease-and-dental-bone-graft-treatment"
                component={withMetaData(PeriodontalQuestions)}
              />
              <PublicRoute
                exact
                path="/terms-and-conditions"
                component={withMetaData(TermsAndConditions)}
              />
              <PublicRoute
                exact
                path="/best-live-dentist-video-about-us "
                component={withMetaData(AboutUs)}
              />
              <PublicRoute
                exact
                path="/join-us"
                component={withMetaData(JoinUs)}
              />
              <PublicRoute
                exact
                path="/how-it-works"
                component={withMetaData(HowItWorks)}
              />
              <PublicRoute
                exact
                path="/privacy-policy-teledental"
                component={withMetaData(PrivacyPolicy)}
              />
              <PublicRoute
                exact
                path="/sitemap"
                component={withMetaData(SiteMap)}
              />
              <PublicRoute
                exact
                path="/email-verified"
                component={withMetaData(ConfirmEmailVerification)}
              />
              <PublicRoute
                exact
                path="/teeth-sensitivity-and-teledental-sensitive-tooth"
                component={withMetaData(
                  TeethSensitivityandTeledentalSensitiveTooth
                )}
              />
              <PublicRoute
                exact
                path="/dental-implant-information"
                component={withMetaData(LiveDental)}
              />
              <PublicRoute
                exact
                path="/video-dental-exams"
                component={withMetaData(VideoDentalExam)}
              />
              <PublicRoute
                exact
                path="/voluntary-product-accessibility-template"
                component={withMetaData(VPAT)}
              />
              <PublicRoute
                exact
                path="/dental-insurance"
                component={withMetaData(DentalInsurance)}
              />
              <PublicRoute
                exact
                path="/best-teledental-dentists-sign-up-subscription-one"
                component={withMetaData(SubscriptionOne)}
              />
              <PublicRoute
                exact
                path="/dental-office-sign-up-teledental-subscription"
                component={withMetaData(SubscriptionSecond)}
              />
              <PublicRoute
                exact
                path="/agora-info"
                component={withMetaData(AgoraInformation)}
              />
              <PatientRoute
                exact
                path="/patients/create-request"
                component={withMetaData(CreateRequest)}
              />
              <PatientRoute
                exact
                path="/patients/dashboard"
                component={withMetaData(Dashboard)}
              />
              <PatientRoute
                exact
                path="/patients/request/:id"
                component={withMetaData(RequestDetails)}
              />
              <PatientRoute
                exact
                path="/patients/messages/:id?"
                component={withMetaData(Inbox)}
              />
              <PatientRoute
                exact
                path="/patients/profile"
                component={withMetaData(Profile)}
              />
              <PatientRoute
                exact
                path="/patients/video-chat/:id"
                component={withMetaData(PatientVideoChat)}
              />
              <PatientRoute
                exact
                path="/patients/payment-form"
                component={withMetaData(PaymentForm)}
              />
              <PatientRoute exact path="/patients/plans" component={Plans} />
              <PatientRoute
                exact
                path="/patients/myappointments"
                component={withMetaData(MyAppointments)}
              />
              <DentistRoute
                exact
                path="/dentists/messages/:id?"
                component={withMetaData(Inbox)}
              />
              <DentistRoute
                exact
                path="/dentists/request/:id"
                component={withMetaData(RequestDetails)}
              />
              <DentistRoute
                exact
                path="/dentists/profile"
                component={withMetaData(DentistDashboard)}
              />
              <DentistRoute
                exact
                accountIsActivated={false}
                path="/dentists/identity-verification"
                component={withMetaData(IdentityVerification)}
              />
              <DentistRoute
                exact
                path="/dentists/video-chat/:id"
                component={withMetaData(DentistVideoChat)}
              />
              <DentistRoute
                exact
                path="/dentists/unapproveddentists"
                component={withMetaData(UnApprovedDentist)}
              />
              <DentistRoute
                exact
                path="/dentists/unapprovedappointments"
                component={withMetaData(UnApprovedAppointments)}
              />
              <DentistRoute
                exact
                path="/dentists/howitworks"
                component={withMetaData(HowItWork)}
              />
            </Elements>
          </Switch>
        </Suspense>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default AppRouter;
