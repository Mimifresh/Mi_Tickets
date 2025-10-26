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
    const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, ticket: null });

    useEffect(() => {
        const sessionKey = localStorage.getItem("ticketapp_session");
        if (!isAuthenticated || !sessionKey) {
            setToast({ message: "Your session has expired — please log in again.", type: "error" });
            setTimeout(() => { navigate("/auth/login", { replace: true }); }, 800);
            return;
        }
    }, [isAuthenticated, navigate]);

    async function load() {
        setLoading(true);
        try {
            const data = await ticketService.getTickets();
            setTickets(data);
        } catch (error) {
            setError("Failed to load tickets. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    function onstorage(e) {
        load();
    };
    window.addEventListener("storage", onstorage);
    return () => window.removeEventListener("storage", onstorage);
    }, []);

    async function handleCreate(payload) {
        try {   
            const newTicket = await ticketService.createTicket(payload);
            setTickets(prev => [newTicket, ...prev]);
            setCreating(false);
            setToast({ message: "Ticket created successfully", type: "success" });
        } catch (error) {
            setToast({ message: error.message || "Failed to create ticket", type: "error" });
        }
    }

    function handleEditStart(ticket) {
        setEditingTicket(ticket);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function handleUpdate(id, changes) {
        try {
            const updatedTicket = await ticketService.updateTicket(id, changes);
            setTickets(prev => prev.map(ticket => ticket.id === id ? updatedTicket : ticket));
            setEditingTicket(null);
            setToast({ message: "Ticket updated successfully", type: "success" });
        } catch (error) {
            setToast({ message: error.message || "Failed to update ticket", type: "error" });
        }
    }

    function handleDeleteStart(ticket) {
        setConfirmDelete({ isOpen: true, ticket });
    }

    async function handleDeleteConfirm() {
        const ticket =  confirmDelete.ticket;
        try {
            await ticketService.deleteTicket(ticket.id);
            setTickets(prev => prev.filter(t => t.id !== ticket.id));
            setConfirmDelete({ isOpen: false, ticket: null });
            setToast({ message: "Ticket deleted successfully", type: "success" });
        } catch (error) {
            setToast({ message: error.message || "Failed to delete ticket", type: "error" });
        }
    }

    if (loading) {
        return <div className="container">Loading tickets...</div>;
    }

    return (
        <div className="container">
            <header className="ticket-list-header">
                <h1>Ticket Management</h1>
                <div>
                    {!creating && !editingTicket && <button onClick={() => setCreating(true)}>Create New Ticket</button>}
                </div>
            </header>

            {creating && (
                <section className="ticket-form-section">
                    <h2>Create New Ticket</h2>
                    <TicketForm initialData={{}} onCancel={()=> setCreating(false)} onSubmit={handleCreate} submitLabel="Create"/>
                </section>
            )}

            {editingTicket && (
                <section className="ticket-form-section">
                    <h2>Edit Ticket</h2>
                    <TicketForm
                        initialData={editingTicket}
                        onCancel={() => setEditingTicket(null)}
                        onSubmit={handleUpdate}
                        submitLabel="Update"
                    />  
                </section>
            )}

            <section className="ticket-list-section">
                {tickets.length === 0 ? (
                    <p>No tickets available.</p>
                ) : (
                    <div>
                        {tickets.map(ticket => (
                            <TicketCard key={ticket.id}>
                                <h3>{ticket.title}</h3>
                                <p>{ticket.description}</p>
                                <button onClick={() => handleEditStart(ticket)}>Edit</button>
                                <button onClick={() => handleDeleteStart(ticket)}>Delete</button>
                            </TicketCard>
                        ))}
                    </div>
                )}
            </section>

            <ConfirmDialog
                isOpen={confirmDelete.isOpen}
                title="Confirm Deletion"
                onClose={() => setConfirmDelete({ isOpen: false, ticket: null })}
                onConfirm={handleDeleteConfirm}
                message={`Are you sure you want to delete the ticket "${confirmDelete.ticket?.title}"?`}
            />

            <Toast
                message={toast?.message}
                type={toast?.type}
                onClose={() => setToast(null)}
            />
        </div>
    );
}
