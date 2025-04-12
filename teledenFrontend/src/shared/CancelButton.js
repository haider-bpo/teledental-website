import React, { useState } from "react";
import { useAppointmentBookingContext } from "../Context/useAppointmentBookingContext";
import CancelConfirmationPopup from "./CancelConfirmationPopup";

const CancelButton = () => {
  const { goToStep } = useAppointmentBookingContext();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancelClick = () => {
    setShowConfirmation(true);
  };

  const handleClosePopup = () => {
    setShowConfirmation(false);
  };

  const handleConfirmCancel = () => {
    setShowConfirmation(false);
    goToStep(1);
  };

  return (
    <>
      <button
        className="btn cancel_btn border-0"
        onClick={handleCancelClick}
        type="button"
      >
        Cancel
      </button>
      <CancelConfirmationPopup
        isOpen={showConfirmation}
        onClose={handleClosePopup}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
};

export default CancelButton;
