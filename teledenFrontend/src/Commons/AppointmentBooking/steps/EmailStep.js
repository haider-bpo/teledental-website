import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppointmentBookingContext } from "../../../Context/useAppointmentBookingContext";
import Logo from "../../../shared/Logo";
import CancelButton from "../../../shared/CancelButton";

// Define schema for validation
const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const EmailStep = () => {
  const { nextStep, updateFormData, formData } = useAppointmentBookingContext();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: formData.email,
    },
  });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Logo both={true} />
        <h3 className="subtitle mb-2">
          Let's get your appointment set up. Enter your email below.
        </h3>
        <div className="mb-4 mt-4 mx-3">
          <input
            type="email"
            className={`form-control form-control-lg ${
              errors.email ? "is-invalid" : ""
            }`}
            placeholder="Email *"
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback text-start">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="d-flex justify-content-between mt-5 px-3">
          <CancelButton />
          <button type="submit" className="btn btn_blue px-4">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailStep;
