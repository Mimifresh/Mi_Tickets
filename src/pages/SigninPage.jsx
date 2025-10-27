import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { isValidEmail, validatePassword, validateName } from "../utilities/validators";
import Toast from "../../components/Toast";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigation = useNavigate();

  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState({});
  const [toast, setToast] = useState(null);

  function setField(name, value) {
    setFields(prev => ({ ...prev, [name]: value }));
    clearInlineError(name);
  }

  function showInlineError(name, message) {
    setError(prev => ({ ...prev, [name]: message }));
  }

  function clearInlineError(name) {
    setError(prev => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError({});

    const nameError = validateName(fields.name);
    const emailError = isValidEmail(fields.email);
    const passwordError = validatePassword(fields.password);
    const confirmPasswordError =
      fields.password !== fields.confirmPassword ? "Passwords do not match" : "";

    if (nameError || emailError || passwordError || confirmPasswordError) {
      if (nameError) showInlineError("name", nameError);
      if (emailError) showInlineError("email", emailError);
      if (passwordError) showInlineError("password", passwordError);
      if (confirmPasswordError) showInlineError("confirmPassword", confirmPasswordError);
      return;
    }

    try {
      await signup({
        name: fields.name.trim(),
        email: fields.email.trim(),
        password: fields.password.trim(),
      });

      setToast({ message: "Account created successfully!", type: "success" });
      setTimeout(() => navigation("/dashboard", { replace: true }), 800);
    } catch (err) {
      setToast({ message: err.message || "Signup failed", type: "error" });
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join Mi Tickets today</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" value={fields.name} onChange={e => setField("name", e.target.value)} />
            <small className="error">{error.name}</small>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" value={fields.email} onChange={e => setField("email", e.target.value)} />
            <small className="error">{error.email}</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={fields.password} onChange={e => setField("password", e.target.value)} />
            <small className="error">{error.password}</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" value={fields.confirmPassword} onChange={e => setField("confirmPassword", e.target.value)} />
            <small className="error">{error.confirmPassword}</small>
          </div>

          <button className="btn-primary auth-btn" type="submit">Create Account</button>
            <p className="auth-switch">
                Already have an account?
                <Link to="/auth/login"> Login</Link>
            </p>
        </form>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}
