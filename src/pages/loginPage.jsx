import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isValidEmail, validatePassword } from "../utilities/validators";

export default function LoginPage() {
    const { login } = useAuth();
    const navigation = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
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
            await login(email, password);
            navigation("/dashboard");
        } catch (error) {
            showInlineError("general", error.message);
        } finally {
            submitButtonRef.current.disabled = false;
        }
    }
}