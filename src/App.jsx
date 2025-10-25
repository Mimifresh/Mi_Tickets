import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../context/AuthContext';
import MainLayout from "./layout/mainLayout";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/loginPage";
import SigninPage from "./pages/SigninPage";
import ProtectedRoute from "../components/protectedRoute";

export default function App() {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="auth/*" element={<AuthLayout />} >
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SigninPage />} />
            </Route>
            <Route path="dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}