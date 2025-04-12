import React, { useState } from "react";
import Header from "../Header";
import "./auth.css";
import AuthCard from "./AuthCard";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import RoleSelector from "./RoleSelector";

function Auth() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [userRole, setUserRole] = useState("patient");

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
  };

  return (
    <div className="d-flex flex-column gap-5">
      <Header />

      <AuthCard userRole={userRole} onRoleChange={handleRoleChange}>
        {isLoginForm ? (
          <LoginForm userRole={userRole} toggleForm={toggleForm} />
        ) : (
          <SignupForm userRole={userRole} toggleForm={toggleForm} />
        )}
      </AuthCard>
    </div>
  );
}

export default Auth;
