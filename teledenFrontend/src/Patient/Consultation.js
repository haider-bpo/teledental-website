import * as React from "react";
import PaymentForm from "../Commons/PaymentForm";
import Plans from "../Commons/Plans";

export default function Consultation() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedPlan, setSelectedPlan] = React.useState(0);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {activeStep === 0 && (
        <PaymentForm
          selectedPlan={selectedPlan}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 1 && <Plans setActiveStep={setActiveStep} />}
    </div>
  );
}
