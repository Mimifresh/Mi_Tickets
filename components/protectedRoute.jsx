import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const sessionKey = localStorage.getItem("ticketapp_session");
  if (!isAuthenticated || !sessionKey) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
