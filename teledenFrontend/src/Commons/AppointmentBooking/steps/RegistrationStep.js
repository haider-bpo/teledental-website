import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CancelButton from "../../../shared/CancelButton";
import { useAppointmentBookingContext } from "../../../Context/useAppointmentBookingContext";

// Define schema for validation
const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const RegistrationStep = () => {
  const { nextStep, updateFormData, formData } = useAppointmentBookingContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      email: formData.email,
      phone: formData.phone,
      acceptTerms: formData.acceptTerms,
    },
  });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="container" style={{ maxWidth: "745px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="title text-center text-md-start mb-4">Register With Teledental</h3>
        <p className="subtitle text-md-start mb-4">
          We just need to collect a few details before reserving your
          appointment.
        </p>

        <div className="row mb-3 p-0">
          <div className="col-md-6 mb-3 mb-md-0 p-0">
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="First Name *"
              {...register("firstName")}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>
          <div className="col-md-6 p-0 ps-md-2">
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Last Name *"
              {...register("lastName")}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>
        </div>

        <h5 className="mb-2 section_title">Location</h5>
        <p className="text-muted mb-3 section_subtitle">
          Match with a dental provider near you.
        </p>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            placeholder="Street Address *"
            {...register("address")}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address.message}</div>
          )}
        </div>

        <div className="row mb-4">
          <div className="col-md-4 mb-3 mb-md-0 p-0">
            <input
              type="text"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              placeholder="City *"
              {...register("city")}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city.message}</div>
            )}
          </div>
          <div className="col-md-4 mb-3 mb-md-0 p-0 ps-md-2 pe-md-2">
            <input
              type="text"
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
              placeholder="State *"
              {...register("state")}
            />
            {errors.state && (
              <div className="invalid-feedback">{errors.state.message}</div>
            )}
          </div>
          <div className="col-md-4 p-0">
            <input
              type="text"
              className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
              placeholder="Zip Code *"
              {...register("zipCode")}
            />
            {errors.zipCode && (
              <div className="invalid-feedback">{errors.zipCode.message}</div>
            )}
          </div>
        </div>

        <h5 className="mb-2 section_title">Contact Information</h5>
        <p className="text-muted mb-3 section_subtitle">
          We will send you a confirmation code for the next page.
        </p>
        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter Your Email *"
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="tel"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            placeholder="Enter Your Phone Number *"
            {...register("phone")}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>

        <div className="mb-4 form-check">
          <input
            type="checkbox"
            className={`form-check-input ${
              errors.acceptTerms ? "is-invalid" : ""
            }`}
            id="acceptTerms"
            {...register("acceptTerms")}
          />
          <label className="form-check-label" htmlFor="acceptTerms">
            I accept the{" "}
            <a href="#" className="text_blue fw-light">
              Terms and Conditions.
            </a>
          </label>
          {errors.acceptTerms && (
            <div className="invalid-feedback">{errors.acceptTerms.message}</div>
          )}
        </div>

        <hr className="mb-4" />

        <div className="d-flex justify-content-between">
          <CancelButton />
          <button type="submit" className="btn btn_blue px-4">
            Finish
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationStep;
