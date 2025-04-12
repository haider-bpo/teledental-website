import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import CancelButton from "../../shared/CancelButton";
import { useHistory } from "react-router-dom";
import Logo from "../../shared/Logo";
import Header from "../Header";

// Define schema for validation
const schema = z.object({
  verificationCode: z.string().min(1, "Please enter the verification code"),
});

const EmailVerification = () => {
  const history = useHistory();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    history.push("/");
  };

  return (
    <div className="d-flex flex-column gap-5">
      <Header />
      <div className="container text-center mt-3" style={{ maxWidth: "600px", minHeight:'70vh' }}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="my-5">
            <div className="mb-3">
              <Logo size="small" />
            </div>
            <h2 className="text-primary mb-4 title text-md-start">
              Email Verification
            </h2>
            <p className="mb-5 subtitle text-md-start">
              Enter the authentication code that we have sent to your email to
              proceed.
            </p>
            <div className="mb-5">
              <input
                type="text"
                className={`form-control form-control-lg ${
                  errors.verificationCode ? "is-invalid" : ""
                }`}
                placeholder="Enter Authentication Code *"
                {...register("verificationCode")}
              />
              {errors.verificationCode && (
                <div className="invalid-feedback">
                  {errors.verificationCode.message}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between">
              {/* <CancelButton /> */}
              <button type="submit" className="btn btn_blue px-4">
                Verify Me
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
