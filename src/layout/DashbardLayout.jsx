import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("ticketapp_session")
        logout();
        document.body.focus?.()
        navigate("/", { replace: true });
    }

    return(
        <div className="dashboard-root">
            <header className="dashboard-header" role="banner">
                <div className="container">
                    <div className="dashboard-header-inner">
                        <div className="dashboard-brand">
                            <h1 className="brand-title">Mi Tickets</h1>
                            <p className="visually-hidden">Dashboard Navigation</p>
                        </div>
                        <nav aria-label="Dashboard Navigation" className="dashboard-nav" role="navigation">
                            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                Overview
                            </NavLink>
                            <NavLink to="/tickets" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                Tickets
                            </NavLink>
                        </nav>
                        <div className="dashboard-actions">
                            <span className="user-greeting">Hello, {user?.name || "User"}</span>
                            <button 
                                onClick={handleLogout}
                                className="logout-button"
                                aria-label="Logout from your account"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="dashboard-main" role="main" id="main-content">
                <Outlet />
            </main>
        </div>
    )
}