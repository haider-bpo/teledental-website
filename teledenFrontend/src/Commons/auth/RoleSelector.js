import React from "react";
import "./auth.css";

/**
 * RoleSelector component for toggling between patient and dentist roles
 * @param {string} userRole - Current selected role ("patient" or "dentist")
 * @param {function} onRoleChange - Callback function when role changes
 * @returns {JSX.Element} - Role selector component with tabs
 */
function RoleSelector({ userRole, onRoleChange }) {
  return (
    <div className="role-selector">
      <div className="tab-group">
        <div
          className={`tab-item ${userRole === "patient" ? "active" : ""}`}
          onClick={() => onRoleChange("patient")}
        >
          Patient
        </div>
        <div
          className={`tab-item ${userRole === "dentist" ? "active" : ""}`}
          onClick={() => onRoleChange("dentist")}
        >
          Dentist
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;
