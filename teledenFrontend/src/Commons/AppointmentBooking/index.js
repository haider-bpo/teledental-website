import React, { useEffect, useState } from "react";
import { AppointmentBookingProvider } from "../../Context/useAppointmentBookingContext";
import EmailStep from "./steps/EmailStep";
import RegistrationStep from "./steps/RegistrationStep";
import VerificationStep from "./steps/VerificationStep";
import PatientHistoryStep from "./steps/PatientHistoryStep";
import ConsultationStep from "./steps/ConsultationStep";
import PaymentStep from "./steps/PaymentStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import AppointmentStep from "./steps/AppointmentStep";

function AppointmentBookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EmailStep />;
      case 2:
        return <RegistrationStep />;
      case 3:
        return <VerificationStep />;
      case 4:
        return <ConsultationStep screenSize />;
      case 5:
        return <PatientHistoryStep />;
      case 6:
        return <AppointmentStep />;
      case 7:
        return <PaymentStep />;
      case 8:
        return <ConfirmationStep />;
      default:
        return <EmailStep />;
    }
  };

  return (
    <AppointmentBookingProvider
      initialStep={currentStep}
      setCurrentStep={setCurrentStep}
    >
      <div className="w-100 bg-dange booing_form">{renderStep()}</div>
    </AppointmentBookingProvider>
  );
}

export default AppointmentBookingForm;
