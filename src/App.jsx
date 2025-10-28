import './App.css';
import './styles/TicketList.css';
import './styles/Footer.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../context/AuthContext';
import MainLayout from "./layout/mainLayout";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/loginPage";
import SigninPage from "./pages/SigninPage";
import ProtectedRoute from "../components/protectedRoute";
import DashboardLayout from './layout/DashbardLayout';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';

export default function App() {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="auth/*" element={<AuthLayout />} >
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SigninPage />} />
            </Route>
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='tickets' element={<TicketList />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}