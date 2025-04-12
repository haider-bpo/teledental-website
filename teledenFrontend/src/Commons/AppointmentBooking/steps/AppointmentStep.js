import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ProgressBar from "../../../shared/ProgressBar";
import CancelButton from "../../../shared/CancelButton";
import { useAppointmentBookingContext } from "../../../Context/useAppointmentBookingContext";

// Define schema for validation
const schema = z.object({
  appointmentTime: z.string().min(1, "Please select a time preference"),
});

const AppointmentStep = () => {
  const { nextStep, prevStep, updateFormData, formData } =
    useAppointmentBookingContext();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      appointmentTime: formData.appointmentTime || "asap",
    },
  });

  const watchAppointmentTime = watch("appointmentTime");

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProgressBar step={3} />
        <div className="row mb-4">
          <div className="col">
            <h3 className="top_heading">Schedule An Appointment</h3>
            <p className="subtitle text-md-start">
              Find the time that matches with your schedule.
            </p>
          </div>
        </div>

        <h4 className="mb-3 heading_title">Preferred Consultation Time</h4>

        <div className="mb-4 btn-group group_btn w-100">
          <input type="hidden" {...register("appointmentTime")} />
          <div className="btn-group w-100">
            <button
              type="button"
              className={`btn ${
                watchAppointmentTime === "asap"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("appointmentTime", "asap", { shouldValidate: true })
              }
            >
              As soon as possible
            </button>
            <button
              type="button"
              className={`btn ${
                watchAppointmentTime === "specific"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("appointmentTime", "specific", {
                  shouldValidate: true,
                })
              }
            >
              Specific time/day
            </button>
          </div>
          {errors.appointmentTime && (
            <div className="text-danger mt-2">
              {errors.appointmentTime.message}
            </div>
          )}
        </div>

        {watchAppointmentTime === "specific" && (
          <div className="mb-4">
            <label className="mb-2 heading_title">Select a Date and Time</label>
            <div className="row">
              <div className="col-md-6 mb-3 p-0">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Select Date"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="col-md-6">
                <select className="form-select py-2">
                  <option value="" disabled>Select Time</option>
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 8PM)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <hr className="my-4" />

        <div className="d-flex justify-content-between">
          <CancelButton />
          <div>
            <button
              type="button"
              className="btn back_btn me-2"
              onClick={prevStep}
            >
              Back
            </button>
            <button type="submit" className="btn btn_blue px-4">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentStep;
