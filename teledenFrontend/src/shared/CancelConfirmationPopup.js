import React from "react";
import { useAppointmentBookingContext } from "../Context/useAppointmentBookingContext";

const CancelConfirmationPopup = ({ isOpen, onClose, onConfirm }) => {
  const { resetBookingForm } = useAppointmentBookingContext();

  const handleConfirm = () => {
    // Reset the appointment booking context data
    resetBookingForm();

    // Call the original onConfirm function
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
    >
      <div
        className="bg-white p-4 rounded-3 shadow"
        style={{ maxWidth: "500px", width: "90%" }}
      >
        <div className="text-center mb-4">
          <h3 className="text_blue fw-bold">Cancel Booking?</h3>
          <p className="text-secondary" style={{ fontFamily: "Piazzolla" }}>
            You will not be able to recover your progress.
          </p>
        </div>

        <div className="d-flex justify-content-between">
          <button
            className="btn fw-bold border-0 px-4 py-2"
            onClick={onClose}
            style={{ borderColor: "#0071BC", color: "#0071BC" }}
          >
            Keep Editing
          </button>
          <button
            className="btn fw-bold px-4 py-2 rounded-5"
            onClick={handleConfirm}
            style={{ backgroundColor: "#BC0000", color: "white" }}
          >
            Delete Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationPopup;
