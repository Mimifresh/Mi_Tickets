import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isValidEmail, validatePassword } from "../utilities/validators";
import { Link } from "react-router-dom";
import Toast from "../../components/Toast";


export default function LoginPage() {
    const { login } = useAuth();
    const navigation = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [toast, setToast] = useState(null);
    const submitButtonRef = useRef(null);

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
        const emailError = isValidEmail(email);
        const passwordError = validatePassword(password);
        if (emailError || passwordError) {
            if(emailError)showInlineError("email", emailError);
            if(passwordError)showInlineError("password", passwordError);
            const firstErrorField = document.querySelector("[data-error='true']") || document.getElementById("email");
            firstErrorField.focus();
            return;
        }
        try {
            await login({ email, password });
            setToast({ message: "Login successful", type: "success" });
            setTimeout(() => { navigation("/dashboard", { replace: true }) }, 600);
        } catch (error) {
            setToast({ message: error.message || "Login failed", type: "error" });
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Login to continue to Mi Tickets</p>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <small className="error">{error.email}</small>
                </div>

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <small className="error">{error.password}</small>
                </div>

                <button className="btn-primary auth-btn" type="submit">Login</button>

                <p className="auth-switch">
                    Don’t have an account?
                    <Link to="/auth/signup"> Create one</Link>
                </p>
            </form>
            </div>
        </div>
        );

}