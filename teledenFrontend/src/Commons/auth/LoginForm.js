import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schemas";

function LoginForm({ userRole, toggleForm }) {
  // Login form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = (data) => {
    // Handle login logic here
    console.log("Login attempt with:", data);
  };

  return (
    <>
      <div className="auth_title">
        <h1>
          <span className="role_text">{userRole}</span>{" "}
          <span className="auth_text">Login</span>
        </h1>
        <p className="auth_subtitle">
          Register to book your online consultation.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onLoginSubmit)}
        className="d-flex flex-column gap-2"
      >
        <div>
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

        <div>
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

        <div className="forgot_password">
          <Link to={`/${userRole.toLowerCase()}/forgot-password`}>
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="btn btn_blue w-auto px-5 m-auto">
          Login
        </button>
      </form>

      <div className="signup_option">
        <p>
          Not registered as a{" "}
          {userRole === "dentist" ? "Teledental dentist" : userRole}?{" "}
          <span
            onClick={toggleForm}
            className="signup_link"
            style={{ cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </>
  );
}

export default LoginForm;
