import Logo from "../../shared/Logo";
import RoleSelector from "./RoleSelector";

function AuthCard({ userRole, onRoleChange, children }) {
  return (
    <div className="auth_container">
      <div className="auth_card">
        <RoleSelector userRole={userRole} onRoleChange={onRoleChange} />
        <Logo />
        {children}
      </div>
    </div>
  );
}

export default AuthCard;
