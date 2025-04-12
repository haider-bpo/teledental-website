import { useState } from "react";
import { Input, Button, Alert } from "antd";
import { contactUs } from "../../Auth/apis/authV1";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema with zod
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  contactNumber: z.string().optional(),
  location: z.string().min(1, { message: "Please enter your location" }),
  comment: z.string().min(1, { message: "Please enter your message" }),
});

const ContactForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      location: "",
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const body = {
        ...data,
        type: "contact_us",
      };
      const res = await contactUs({ body });
      if (res) {
        Swal.fire({
          icon: "success",
          title:
            "Thank you for reaching us out. We'll get in touch with you shortly.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      setError("");
      setLoading(false);
      reset();
    } catch (error) {
      setLoading(false);
      setError(error.errMsg);
    }
  };

  return (
    <>
      {error && (
        <Alert className="mb-4" message={error} type="error" showIcon />
      )}

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Name *"
                        className={`form-control py-2 custom-placeholder ${
                          errors.name ? "is-invalid" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Email *"
                        className={`form-control py-2 custom-placeholder ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <Controller
                    name="contactNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Phone Number (Optional)"
                        className="form-control py-2 custom-placeholder"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Location (City, State, Country) *"
                        className={`form-control py-2 custom-placeholder ${
                          errors.location ? "is-invalid" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.location && (
                    <div className="invalid-feedback d-block">
                      {errors.location.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <div className="form-group">
                  <Controller
                    name="comment"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        rows={4}
                        placeholder="Message..."
                        className={`form-control custom-placeholder ${
                          errors.comment ? "is-invalid" : ""
                        }`}
                      />
                    )}
                  />
                  {errors.comment && (
                    <div className="invalid-feedback d-block">
                      {errors.comment.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="btn rounded-pill d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#0071BC",
                  borderColor: "#0071BC",
                  width: "250px",
                  height: "55px",
                  fontSize: "18px",
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  boxShadow: "0 2px 4px rgba(0, 113, 188, 0.3)",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#005A94";
                  e.currentTarget.style.borderColor = "#005A94";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 113, 188, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0071BC";
                  e.currentTarget.style.borderColor = "#0071BC";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0, 113, 188, 0.3)";
                }}
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
