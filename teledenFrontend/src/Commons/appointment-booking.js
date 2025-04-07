
import React, { useState } from "react";

const AppointmentBooking = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the booking process here
    console.log("Booking process started with email:", email);
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/hero-banner-bg-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "90%",
        margin: "6rem auto",
        borderRadius: "12px",
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "520px",
      }}
    >
      {/* Tooth icon with star */}
      <div>
        <img
          src="/images/logo.png"
          alt="Teledental Logo"
          className="img-fluid"
        />
      </div>

      {/* Title */}
      <h1 className="booking">Book Your Appointment</h1>

      {/* Subtitle */}
      <p className="booking_subtitle mb-5">
        Let's get your appointment set up. Enter your email below.
      </p>

      {/* Email form */}
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <div style={{ marginBottom: "30px" }}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email *"
            required
            style={{
              width: "97%",
              padding: "15px 20px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "none",
              outline: "none",
            }}
          />
        </div>

        {/* Submit button */}
        <div>
          <button type="submit" className="btn pink_btn">
            Begin Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentBooking;
