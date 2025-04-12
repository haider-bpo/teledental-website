import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./schemas";
import { useHistory } from "react-router-dom";

function SignupForm({ userRole, toggleForm }) {
  const history = useHistory();
  // Signup form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      email: "",
      confirmEmail: "",
      password: "",
    },
  });

  const onSignupSubmit = (data) => {
    // Handle signup logic here
    console.log("Signup attempt with:", data);

    history.push("/verify-email/user-email");
  };

  return (
    <>
      <div className="auth_title">
        <h1>
          <span className="role_text">{userRole}</span>{" "}
          <span className="auth_text">Registration</span>
        </h1>
        <p className="auth_subtitle">
          {userRole === "dentist"
            ? "View and edit your online consultations."
            : "Please fill out the registration form below to request a live Teledental consultation with a dentist."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSignupSubmit)}
        className="d-flex flex-column gap-2"
      >
        <h5 className="text-start mb-2 auth_section_title">
          {userRole === "dentist"
            ? "Patient Information:"
            : "Patient Information:"}
        </h5>
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0 p-0">
            <input
              type="text"
              placeholder="First Name *"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>
          <div className="col-md-6 p-0 ps-md-2">
            <input
              type="text"
              placeholder="Last Name *"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Location (City, State, Country) *"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            {...register("location")}
          />
          {errors.location && (
            <div className="invalid-feedback">{errors.location.message}</div>
          )}
        </div>

        {userRole === "dentist" && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Business Name (Optional)"
              className="form-control"
              {...register("businessName")}
            />
          </div>
        )}

        <h5 className="text-start mb-2 auth_section_title">Account Set Up:</h5>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email *"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Confirm Email *"
            className={`form-control ${
              errors.confirmEmail ? "is-invalid" : ""
            }`}
            {...register("confirmEmail")}
          />
          {errors.confirmEmail && (
            <div className="invalid-feedback">
              {errors.confirmEmail.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Password *"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password")}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        {userRole === "dentist" && (
          <>
            <h5 className="text-start mb-2 auth_section_title">
              Dental Practice:
            </h5>
            <div className="mb-3">
              <select
                className={`form-select ${
                  errors.isLicensedDentist ? "is-invalid" : ""
                }`}
                {...register("isLicensedDentist", {
                  setValueAs: (value) => value === "true",
                })}
              >
                <option value="">I am a licensed dentist</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              {errors.isLicensedDentist && (
                <div className="invalid-feedback">
                  {errors.isLicensedDentist.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <div className="form-check text-start">
                <input
                  type="checkbox"
                  className={`form-check-input ${
                    errors.agreeTerms ? "is-invalid" : ""
                  }`}
                  id="agreeTerms"
                  {...register("agreeTerms")}
                />
                <label
                  className="form-check-label accept_terms"
                  htmlFor="agreeTerms"
                >
                  I agree <span>terms of use</span> &{" "}
                  <span>privacy policy</span>
                </label>

                {errors.agreeTerms && (
                  <div className="invalid-feedback">
                    {errors.agreeTerms.message}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="btn btn_blue w-auto px-5 m-auto"
          style={
            userRole === "dentist"
              ? {
                  backgroundColor: "#0071BC",
                  borderRadius: "25px",
                  padding: "10px 30px",
                }
              : {}
          }
        >
          Sign Up
        </button>
      </form>

      <div className="signup_option">
        <p>
          {userRole === "dentist"
            ? "Already have an account? "
            : "Already have an account? "}
          <span
            onClick={toggleForm}
            className="signup_link"
            style={{
              cursor: "pointer",
              color: userRole === "dentist" ? "#0071BC" : "",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </>
  );
}

export default SignupForm;
