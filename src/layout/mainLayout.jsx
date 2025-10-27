import Footer from "../../components/Footer";
import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header className="navbar">
        <div className="container nav-content">
          <h2 className="logo">Mi Tickets</h2>
          <nav>
            <Link to="/auth/login" className="nav-link">Login</Link>
            <Link to="/auth/signup" className="btn-primary">Get Started</Link>
            <Link to="/dashboard" className="btn-primary">Dashboard</Link>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
