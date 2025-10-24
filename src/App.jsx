import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./layout/AuthLayout";

export default function App() {
  return(
    <Router>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="auth/*" element={<AuthLayout />} >
            {/* Add auth related routes here */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}