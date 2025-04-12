// components/shared/ProgressBar.js
import React from "react";

const ProgressBar = ({ step, totalSteps = 5 }) => {
  return (
    <div className="d-none d-md-flex justify-content-center my-4 flex-grow-1" style={{
      width: "930px",
    }}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="d-flex align-items-center flex-grow-1">
          <div
            className={`rounded-circle ${
              index + 1 <= step ? "bg_blue" : "bg-light border"
            }`}
            style={{
              width: "24px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {index + 1 <= step && <span className="text-white">✓</span>}
          </div>
          {index < totalSteps - 1 && (
            <div
              className="mx-2"
              style={{
                width: "100%",
                borderTop: `3px dashed ${index + 1 < step ? "#0071BC" : "#dee2e6"}`,
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;