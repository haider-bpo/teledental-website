import React, { useState, useEffect } from "react";
import { useAppointmentBookingContext } from "../../../Context/useAppointmentBookingContext";
import ProgressBar from "../../../shared/ProgressBar";
import Logo from "../../../shared/Logo";
import { useHistory } from "react-router-dom";

const ConfirmationStep = () => {
  const { resetBookingForm } = useAppointmentBookingContext();
  const [loading, setLoading] = useState(true);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const history = useHistory();

  // Simulate API call with setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      // Hardcoded appointment details
      setAppointmentDetails({
        doctorName: "Dr. John Smith",
        appointmentTime: "9:50am",
        consultationDuration: "10 Minute",
        doctorImage: "/images/doctor-profile.svg",
      });
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const bookAppointment = () => {
    // Simulate API call to book appointment
    // You can replace this with your actual API call
    // and handle the response accordingly
    // For now, we'll just reset the booking form
    resetBookingForm();
    history.push("/");
  };

  return (
    <div className="container text-center" style={{ maxWidth: "800px" }}>
      <div className="my-5 py-5">
        <ProgressBar step={5} />

        <div className="d-md-none">
          <Logo both={true} />
        </div>

        <hr className="hr_line d-md-none" />

        {loading ? (
          // Initial content
          <>
            <p className="text_blue text-start mb-4">
              We will get back to you shortly.
            </p>
            <div className="mb-4 text-start">
              <h3 className="text_blue">
                Let us get a dentist in your area to confirm the appointment.
              </h3>
              <h3 className="mt-4 text_blue">Thank you.</h3>
            </div>
            <p className="mb-5 text-start">
              Please check email/phone number to view more details.
            </p>
          </>
        ) : (
          // Appointment details after loading
          <>
            <div className="text-center mb-4">
              <h3 className="text_blue mb-3">
                Your appointment has been scheduled
              </h3>
              <p className="text-muted">
                Please check email/phone number to view more details.
              </p>
            </div>

            <div
              className="border rounded-3 p-4 mb-4"
              style={{ borderColor: "#0071BC" }}
            >
              <div className="row align-items-center">
                <div className="col-md-3 text-center mb-3 mb-md-0">
                  <img
                    src={appointmentDetails.doctorImage}
                    alt="Doctor"
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="col-md-5 text-center text-md-start mb-3 mb-md-0">
                  <h4 className="text_blue mb-2">
                    {appointmentDetails.doctorName}
                  </h4>
                  <h2 className="text_blue" style={{ fontSize: "2.5rem" }}>
                    {appointmentDetails.appointmentTime}
                  </h2>
                </div>
                <div className="col-md-4 text-center text-md-start">
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                    <span
                      className="text_blue fw-bold"
                      style={{ fontSize: "1.2rem" }}
                    >
                      &gt; {appointmentDetails.consultationDuration}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text_blue">Consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <hr className="hr_line d-md-none" />

        <button
          type="button"
          className="btn btn_blue px-5 py-2"
          onClick={bookAppointment}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
