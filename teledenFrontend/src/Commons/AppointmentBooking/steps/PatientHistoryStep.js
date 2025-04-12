import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ProgressBar from "../../../shared/ProgressBar";
import CancelButton from "../../../shared/CancelButton";
import { useAppointmentBookingContext } from "../../../Context/useAppointmentBookingContext";

// Define schema for validation
const schema = z.object({
  dentalInsurance: z.string().min(1, "Please select an option"),
  lastCleaning: z.string().min(1, "Please select an option"),
  lastVisit: z.string().min(1, "Please select an option"),
  lastXrays: z.string().min(1, "Please select an option"),
  photos: z.array(z.any()).optional(),
});

const PatientHistoryStep = () => {
  const { nextStep, prevStep, updateFormData, formData } =
    useAppointmentBookingContext();
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

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
      dentalInsurance: formData.dentalInsurance || "no",
      lastCleaning: formData.lastCleaning || "less",
      lastVisit: formData.lastVisit || "less",
      lastXrays: formData.lastXrays || "less",
    },
  });

  const watchDentalInsurance = watch("dentalInsurance");
  const watchLastCleaning = watch("lastCleaning");
  const watchLastVisit = watch("lastVisit");
  const watchLastXrays = watch("lastXrays");

  const onSubmit = (data) => {
    updateFormData({ ...data, photos: files });
    nextStep();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter((file) =>
        file.type.match("image/(jpeg|png|jpg)")
      );

      if (validFiles.length + files.length > 7) {
        alert("You can only upload up to 7 images");
        return;
      }

      setFiles((prev) => [...prev, ...validFiles]);
    },
    [files]
  );

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) =>
      file.type.match("image/(jpeg|png|jpg)")
    );

    if (validFiles.length + files.length > 7) {
      alert("You can only upload up to 7 images");
      return;
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProgressBar step={2} />
        <div className="row mb-4">
          <div className="col">
            <h4 className="text-primary top_heading">Patient History</h4>
            <p className="text-muted subtitle text-md-start">
              Answer a few quick questions for your visit.
            </p>
          </div>
          <div className="col-auto">
            <h4 className="top_heading d-none d-md-block">Hello User!</h4>
          </div>
        </div>

        <hr className="mb-4 text_blue" />

        <div className="mb-4 d-flex flex-column flex-md-row">
          <label className="mb-2 p-0 col-md-9 heading_title">
            Do you have dental insurance?
          </label>
          <div className="btn-group group_btn w-50 col-md-3">
            <input type="hidden" {...register("dentalInsurance")} />
            <button
              type="button"
              className={`btn ${
                watchDentalInsurance === "yes"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("dentalInsurance", "yes", { shouldValidate: true })
              }
            >
              Yes
            </button>
            <button
              type="button"
              className={`btn ${
                watchDentalInsurance === "no"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("dentalInsurance", "no", { shouldValidate: true })
              }
            >
              No
            </button>
          </div>
          {errors.dentalInsurance && (
            <div className="text-danger mt-1">
              {errors.dentalInsurance.message}
            </div>
          )}
          {/* {watchDentalInsurance === "yes" && (
            <div className="mt-2 text-danger">YES - drop down text</div>
          )} */}
        </div>

        <h4 className="top_heading">Dental History</h4>

        <div className="mb-4">
          <label className="mb-2 heading_title">
            When was the last time you had a professional cleaning at a dental
            office?
          </label>
          <div className="btn-group group_btn">
            <input type="hidden" {...register("lastCleaning")} />
            <button
              type="button"
              className={`btn ${
                watchLastCleaning === "less"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("lastCleaning", "less", { shouldValidate: true })
              }
            >
              Less than one year
            </button>
            <button
              type="button"
              className={`btn ${
                watchLastCleaning === "more"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("lastCleaning", "more", { shouldValidate: true })
              }
            >
              One year or more
            </button>
          </div>
          {errors.lastCleaning && (
            <div className="text-danger mt-1">
              {errors.lastCleaning.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 heading_title">
            When was your last visit to the dentist?
          </label>
          <div className="btn-group group_btn">
            <input type="hidden" {...register("lastVisit")} />
            <button
              type="button"
              className={`btn ${
                watchLastVisit === "less"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("lastVisit", "less", { shouldValidate: true })
              }
            >
              Less than one year
            </button>
            <button
              type="button"
              className={`btn ${
                watchLastVisit === "more"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("lastVisit", "more", { shouldValidate: true })
              }
            >
              One year or more
            </button>
          </div>
          {errors.lastVisit && (
            <div className="text-danger mt-1">{errors.lastVisit.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 heading_title">
            When was the last time you had dental x-rays?
          </label>
          <div className="btn-group group_btn">
            <input type="hidden" {...register("lastXrays")} />
            <button
              type="button"
              className={`btn ${
                watchLastXrays === "less"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("lastXrays", "less", { shouldValidate: true })
              }
            >
              Less than one year
            </button>
            <button
              type="button"
              className={`btn ${
                watchLastXrays === "more"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setValue("lastXrays", "more", { shouldValidate: true })
              }
            >
              One year or more
            </button>
          </div>
          {errors.lastXrays && (
            <div className="text-danger mt-1">{errors.lastXrays.message}</div>
          )}
        </div>

        <hr className="mb-4" />

        <div className="mb-5">
          <label className="mb-2 file_upload_title">
            <strong className="heading_title">Upload Photos</strong> of your
            Teeth and Mouth/X-rays{" "}
            <span className="heading_title">(Highly recommended</span> to
            provide up to 7 images{" "}
            <span className="heading_title">(optional))</span>
          </label>
          <div
            className={`border rounded p-5 text-center ${
              isDragging ? "bg-light" : ""
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              id="fileInput"
              multiple
              accept="image/png,image/jpeg,image/jpg"
              className="d-none"
              onChange={handleFileSelect}
            />
            <div className="mb-3 fs-1 plus_btn">
              +
            </div>
            <div className="text-muted small">
              Drag and drop files here or{" "}
              <span
                htmlFor="fileInput"
                className="text_blue btn-link fw-bold"
                style={{ cursor: "pointer" }}
              >
                Choose Files
              </span>
            </div>
            <div className="text-muted small">
              Upload clear pictures of the problem area (inside mouth & affected
              tooth) - PNGs and JPEGs only
            </div>
            {files.length > 0 && (
              <div className="mt-3">
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  {files.map((file, index) => (
                    <div key={index} className="position-relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        className="rounded"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={() => removeFile(index)}
                        style={{ margin: "-8px" }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-muted small">
                  {files.length} of 7 images selected
                </div>
              </div>
            )}
          </div>
        </div>

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

export default PatientHistoryStep;
