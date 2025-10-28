import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as ticketService from "../utilities/ticketServices";
import TicketCard from "../../components/TicketCard";
import TicketForm from "../../components/TicketForm";
import Toast from "../../components/Toast";
import ConfirmDialog from "../../components/confirmDialog";

export default function TicketList() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, ticket: null });

  useEffect(() => {
    const sessionKey = localStorage.getItem("ticketapp_session");
    if (!isAuthenticated || !sessionKey) {
      setToast({ message: "Your session has expired — please log in again.", type: "error" });
      setTimeout(() => {navigate("/auth/login", { replace: true });}, 800);
      return;
    }
  }, [navigate]);


  async function load() {
    setLoading(true);
    try {
      const data = await ticketService.getTickets();
      const sorted = Array.isArray(data) ? data.slice().sort((a, b) => b.id - a.id) : [];
      setTickets(sorted);
    } catch (err) {
      setToast({ message: err.message || "Failed to load tickets. Please retry.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    function onStorage(e) {
      if (e.key === "tickets" || e.key === null) {

        load();
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);

  }, []);

  
  async function handleCreate(payload) {
    setCreating(true);
    try {
      const newTicket = await ticketService.createTicket(payload);

      setTickets(prev => [newTicket, ...prev]);
      setCreating(false);
      setToast({ message: "Ticket created successfully.", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Failed to create ticket.", type: "error" });
        setCreating(false);
    }
  }


  function handleEditStart(ticket) {
    setEditingTicket(ticket);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleUpdate(id, changes) {
    try {
      const updated = await ticketService.updateTicket(id, changes);
      setTickets(prev => prev.map(t => (t.id === id ? updated : t)));
      setEditingTicket(null);
      setToast({ message: "Ticket updated successfully.", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Failed to update ticket.", type: "error" });
    }
  }

  function handleDeleteStart(ticket) {
    setConfirmDelete({ open: true, ticket });
  }

  
  async function handleDeleteConfirm() {
    const ticket = confirmDelete.ticket;
    if (!ticket) return setConfirmDelete({ open: false, ticket: null });

    try {
      await ticketService.deleteTicket(ticket.id);
      setTickets(prev => prev.filter(t => t.id !== ticket.id));
      setConfirmDelete({ open: false, ticket: null });
      setToast({ message: "Ticket deleted successfully.", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Failed to delete ticket.", type: "error" });
    }
  }

  if (loading) return <div className="container">Loading tickets…</div>;

  return (
    <div className="container ticket-list-page">
      <header className="ticket-list-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Ticket Management</h1>
        <div>
          {!creating && !editingTicket && (
            <button onClick={() => setCreating(true)} className="ticket-action-btn btn-primary">Create New Ticket</button>
          )}
        </div>
      </header>

      {creating && (
        <section className="ticket-form-section">
          <h2>Create New Ticket</h2>
          <TicketForm
            initialData={{}}
            onCancel={() => setCreating(false)}
            onSubmit={(payload) => handleCreate(payload)}
            submitLabel="Create"
          />
        </section>
      )}

      {editingTicket && (
        <section className="ticket-form-section">
          <h2>Edit Ticket</h2>
          <TicketForm
            initialData={editingTicket}
            onCancel={() => setEditingTicket(null)}
            onSubmit={(changes) => handleUpdate(editingTicket.id, changes)}
            submitLabel="Update"
          />
        </section>
      )}

      <section className="ticket-list-section" style={{ marginTop: 16 }}>
        {tickets.length === 0 ? (
          <p>No tickets available.</p>
        ) : (
          <div className="tickets-grid" style={{ display: "grid", gap: 12 }}>
            {tickets.filter(Boolean).map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket} 
                onEdit={() => handleEditStart(ticket)}
                onDelete={() => handleDeleteStart(ticket)}
              />
            ))}
          </div>
        )}
      </section>


      <ConfirmDialog
        open={confirmDelete.open}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${confirmDelete.ticket?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDelete({ open: false, ticket: null })}
      />

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  );
}
