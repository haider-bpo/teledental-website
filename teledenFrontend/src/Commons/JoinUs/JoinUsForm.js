import React from "react";
import { Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinUsSchema, positionOptions } from "./schema";

/**
 * Join Us Form component using react-hook-form and zod validation
 */
const JoinUsForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(joinUsSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      confirmEmail: "",
      phoneNumber: "",
      location: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <div className="join-form-container my-5">
      <form
        className="ant-form ant-form-vertical join-us-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Name *"
                {...register("name")}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="">
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <select
                    className={`form-select ${
                      errors.position ? "is-invalid" : ""
                    }`}
                    style={{ padding: "10px" }}
                    {...field}
                  >
                    {positionOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.position && (
                <div className="invalid-feedback">
                  {errors.position.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email *"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="email"
                className={`form-control ${
                  errors.confirmEmail ? "is-invalid" : ""
                }`}
                placeholder="Confirmation Email *"
                {...register("confirmEmail")}
              />
              {errors.confirmEmail && (
                <div className="invalid-feedback">
                  {errors.confirmEmail.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="tel"
                className={`form-control ${
                  errors.phoneNumber ? "is-invalid" : ""
                }`}
                placeholder="Phone Number (Optional)"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <div className="invalid-feedback">
                  {errors.phoneNumber.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${
                  errors.location ? "is-invalid" : ""
                }`}
                placeholder="Location (City, State, Country) *"
                {...register("location")}
              />
              {errors.location && (
                <div className="invalid-feedback">
                  {errors.location.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <textarea
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
                rows={5}
                placeholder="Message (Reason for your inquiry)..."
                {...register("message")}
              ></textarea>
              {errors.message && (
                <div className="invalid-feedback">{errors.message.message}</div>
              )}
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <Button className="submit-btn" type="primary" htmlType="submit">
              Submit Form
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JoinUsForm;
