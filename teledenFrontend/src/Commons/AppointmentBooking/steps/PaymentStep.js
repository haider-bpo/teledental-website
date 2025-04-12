import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CancelButton from "../../../shared/CancelButton";
import { useAppointmentBookingContext } from "../../../Context/useAppointmentBookingContext";
import Logo from "../../../shared/Logo";

// Define schema for validation
const schema = z.object({
  paymentMethod: z.string().min(1, "Please select a payment method"),
  termsCheck: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

const PaymentStep = () => {
  const { nextStep, prevStep } = useAppointmentBookingContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: "card",
      termsCheck: true,
    },
  });

  const watchPaymentMethod = watch("paymentMethod");

  const onSubmit = () => {
    nextStep();
  };

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="d-block d-md-none">
            <Logo both={true} />
          </div>

          <div className="d-none d-md-block">
            <img src="/images/logo-with-text.png" alt="Payment Step" />
            <div
              className="d-flex flex-column align-items-end"
              style={{
                marginTop: "-1.5rem",
                marginRight: "31rem",
              }}
            >
              <p className="payment_heading" style={{ color: "#F7A5F9" }}>
                Teledental.com
              </p>
              <p
                className="payment_heading"
                style={{
                  marginTop: "-.6rem",
                }}
              >
                DentalChat.com
              </p>
            </div>
          </div>

          <hr className="hr_line d-md-none" />

          <div className="col-md-7 pe-md-4 order-2 order-md-1">
            <hr className="hr_line d-md-none" />

            <div>
              <h4 className="mb-4 text_blue d-none d-md-block">Hi User,</h4>
              <h5 className="mb-3 text-center text-md-start">Payment:</h5>

              <div
                className="border rounded-3 mb-3"
                style={{ borderColor: "#6490D8" }}
              >
                <div className="mb-3 p-3">
                  <div className="form-check d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-row-reverse align-items-center ">
                      <input
                        className="form-check-input end-0 me-4"
                        type="radio"
                        id="card"
                        value="card"
                        {...register("paymentMethod")}
                        checked={watchPaymentMethod === "card"}
                      />
                      <label className="form-check-label me-2" htmlFor="card">
                        Card
                      </label>
                    </div>
                  </div>
                </div>

                <hr className="my-3 mx-4" />

                <div className="mb-3 p-3">
                  <div className="form-check d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-row-reverse align-items-center ">
                      <input
                        className="form-check-input end-0 me-4"
                        type="radio"
                        id="paypal"
                        value="paypal"
                        {...register("paymentMethod")}
                      />
                      <label className="form-check-label me-2" htmlFor="paypal">
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>

                <hr className="my-3 mx-4" />

                <div className="mb-5 p-3">
                  <div className="form-check d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-row-reverse align-items-center">
                      <input
                        className="form-check-input end-0 me-4"
                        type="radio"
                        id="applepay"
                        value="applepay"
                        {...register("paymentMethod")}
                      />
                      <label
                        className="form-check-label me-2"
                        htmlFor="applepay"
                      >
                        Apple Pay
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {errors.paymentMethod && (
                <div className="text-danger mb-3">
                  {errors.paymentMethod.message}
                </div>
              )}
            </div>

            <div className="mb-4 form-check">
              <input
                type="checkbox"
                className={`form-check-input ${
                  errors.termsCheck ? "is-invalid" : ""
                }`}
                id="termsCheck"
                {...register("termsCheck")}
              />
              <label
                className="form-check-label"
                style={{ fontWeight: "400" }}
                htmlFor="termsCheck"
              >
                You acknowledge requesting a 10 minute or less dental
                consultation with a dentist for a fee of $50. You understand
                there are no refunds. You agree to our terms and conditions, and
                privacy policy
              </label>
              {errors.termsCheck && (
                <div className="invalid-feedback">
                  {errors.termsCheck.message}
                </div>
              )}
            </div>

            <hr className="hr_line d-md-none" />

            <div className="d-flex justify-content-between">
              <CancelButton />
              <div className="d-flex flex-row">
                <button
                  type="button"
                  className="btn back_btn text-primary me-2"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button type="submit" className="btn-primary px-4">
                  Finish Booking
                </button>
              </div>
            </div>
          </div>

          <div
            className="col-md-5 p-4 rounded order-1 order-md-2 text_blue d-flex flex-column justify-content-center"
            style={{ backgroundColor: "#0071BC33" }}
          >
            <h4 className="mb-4 text_blue text-center text-md-start">
              Here is your order summary:
            </h4>
            <div className="d-flex justify-content-between mb-2">
              <div> 10 min video consultation:</div>
              <div className="fw-bold">$50</div>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <div>
                Tax: <span className="text-danger">TAX???</span>
              </div>
              <div className="fw-bold">$6</div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-3">
              <div className="fw-bold">Total:</div>
              <div className="fw-bold">$56</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentStep;
