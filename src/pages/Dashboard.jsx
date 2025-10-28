/**import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";


function readTicketsFromStorage() {
    try{
        return JSON.parse(localStorage.getItem("tickets")) || [];
    } catch (error) {
        console.error("Error reading tickets from storage:", error);
        return [];
    }
}

export default function Dashboard() {
    const [tickets, setTickets] = useState(() => readTicketsFromStorage());

    useEffect(() => {
        function onStorageChange(e) {
            if (e.key === "tickets") {
                setTickets(readTicketsFromStorage());
        }
    }
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
    }, []);

    const ticketCount = useMemo(() => {
        const total = tickets.length;
        const open = tickets.filter(t => (t.status || "").toLowerCase() === "open").length;
        const resolved = tickets.filter(t => (t.status || "").toLowerCase() === "closed").length;
        const other = total - open - resolved;
        return { total, open, resolved, other };
    }, [tickets]);

    return (
        <section aria-labelledby="dashboard-heading" className="dashboard-overview">
            <div className="dashboard-hero">
                <h2>Dashboard Overview</h2>
                <p>Welcome to your dashboard! Here you can find an overview of your tickets and activities.</p>
            </div>

            <div className="stats-grid" role="group" aria-label="Ticket summary statistics">
                <div className="stat-card" tabIndex="0" aria-describedby="total-desc">
                    <div className="stat-value">{ticketCount.total}</div>
                    <div className="stat-label">Total tickets</div>
                    <div id="total-desc" className="visually-hidden">Total number of tickets</div>
                </div>

                <div className="stat-card" tabIndex="0" aria-describedby="open-desc">
                    <div className="stat-value">{ticketCount.open}</div>
                    <div className="stat-label">Open tickets</div>
                    <div id="open-desc" className="visually-hidden">Tickets currently open</div>
                </div>

                <div className="stat-card" tabIndex="0" aria-describedby="resolved-desc">
                    <div className="stat-value">{ticketCount.resolved}</div>
                    <div className="stat-label">Resolved tickets</div>
                    <div id="resolved-desc" className="visually-hidden">Tickets resolved</div>
                </div>

                <div className="stat-card" tabIndex="0" aria-describedby="other-desc">
                    <div className="stat-value">{ticketCount.other}</div>
                    <div className="stat-label">Other</div>
                    <div id="other-desc" className="visually-hidden">Tickets in other statuses</div>
                </div>
            </div>
            <Link to="/tickets" className="btn-primary dashboard-view-tickets-btn">Manage Tickets</Link>
        </section>
    );
}**/

// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as ticketService from "../utilities/ticketServices";

/**
 * Dashboard page (Comfort layout, soft shadow cards)
 * - Loads tickets from ticketService
 * - Computes counts: total, open, in_progress, closed
 * - Show welcome with user's name (name is required)
 */

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
    other: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const tickets = await ticketService.getTickets();
        if (!mounted) return;
        const total = Array.isArray(tickets) ? tickets.length : 0;
        const open = tickets.filter(t => (t?.status || "").toLowerCase() === "open").length;
        const in_progress = tickets.filter(t => (t?.status || "").toLowerCase() === "in progress" || (t?.status || "").toLowerCase() === "in_progress").length;
        const closed = tickets.filter(t => (t?.status || "").toLowerCase() === "closed").length;
        const other = total - (open + in_progress + closed);
        setTicketCount({ total, open, in_progress, closed, other });
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard stats.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="container dashboard-page" role="region" aria-labelledby="dashboard-heading">
      <section className="dashboard-overview">
        <div className="dashboard-hero card" aria-hidden={false}>
          <div className="dashboard-hero-inner">
            <div>
              <h2 id="dashboard-heading" className="h2">Dashboard Overview</h2>
              <p className="lead">Welcome back, {user?.name}! Here’s a quick summary of your tickets.</p>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Link to="/tickets" className="btn-primary dashboard-view-tickets-btn">Manage Tickets</Link>
            </div>
          </div>
        </div>

        {error && <div className="inline-error" role="alert">{error}</div>}

        <div className="stats-grid" role="group" aria-label="Ticket summary statistics" style={{ marginTop: 18 }}>
          <div className="stat-card card" tabIndex="0" aria-describedby="total-desc">
            <div className="stat-value" aria-hidden="false">{loading ? "…" : ticketCount.total}</div>
            <div className="stat-label">Total tickets</div>
            <div id="total-desc" className="visually-hidden">Total number of tickets</div>
          </div>

          <div className="stat-card card" tabIndex="0" aria-describedby="open-desc">
            <div className="stat-value">{loading ? "…" : ticketCount.open}</div>
            <div className="stat-label">Open</div>
            <div id="open-desc" className="visually-hidden">Tickets currently open</div>
          </div>

          <div className="stat-card card" tabIndex="0" aria-describedby="inprogress-desc">
            <div className="stat-value">{loading ? "…" : ticketCount.in_progress}</div>
            <div className="stat-label">In progress</div>
            <div id="inprogress-desc" className="visually-hidden">Tickets in progress</div>
          </div>

          <div className="stat-card card" tabIndex="0" aria-describedby="closed-desc">
            <div className="stat-value">{loading ? "…" : ticketCount.closed}</div>
            <div className="stat-label">Closed</div>
            <div id="closed-desc" className="visually-hidden">Tickets closed</div>
          </div>
        </div>
      </section>
    </div>
  );
}
