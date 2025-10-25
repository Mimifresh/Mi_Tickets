import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isValidEmail, validatePassword } from "../utilities/validators";
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
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} noValidate className="login-container">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    name="email"
                    onChange={e => { setEmail(e.target.value); clearInlineError("email") }}
                    autoComplete="email"
                    aria-describedby="email-error"
                    data-error={error.email ? "true" : "false"}
                />
                <span id="email-error" role="alert" style={{ color: "red" }} aria-live="assertive">
                    {error.email}
                </span>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    name="password"
                    onChange={e => { setPassword(e.target.value); clearInlineError("password") }}
                    autoComplete="current-password"
                    aria-describedby="password-error"
                    data-error={error.password ? "true" : "false"}
                />
                <span id="password-error" role="alert" style={{ color: "red" }} aria-live="assertive">
                    {error.password}
                </span>
                <button type="submit" ref={submitButtonRef}>Login</button>
            </form>
            <Toast
                message={toast?.message}
                type={toast?.type}
                onClose={() => setToast(null)}
            />
        </div>
    )
}