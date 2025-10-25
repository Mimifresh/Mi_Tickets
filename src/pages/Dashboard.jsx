import { useEffect, useMemo, useState } from "react";
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
        </section>
    );
}