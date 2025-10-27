import React from 'react';

export default function TicketCard({ ticket, onEdit, onDelete }) {
    if(!ticket) return null;
    const statusLabel = ticket.status || 'Unknown';
    const tagClass = `status-tag status-${statusLabel.toLowerCase()}`;
    return (
        <article className="ticket-card"
        role="article"
        tabIndex="0"
        aria-labelledby={`ticket-title-${ticket.id}`}
        aria-describedby={`ticket-desc-${ticket.id}
        ticket-status-${ticket.id}`}>
            <div className='ticket-header'>
                <h3 id={`ticket-title-${ticket.id}`} className="ticket-title">{ticket.title}</h3>
                <span id={`ticket-status-${ticket.id}`} className={tagClass} aria-label={`Status: ${statusLabel}`}>{statusLabel}</span>
            </div>
            {ticket.description ? <p id={`ticket-desc-${ticket.id}`} className="ticket-description">{ticket.description}</p> : null}
            <div className='ticket-meta'>
                <small>Priority: {ticket.priority || 'N/A'}</small>
                <div>
                    <button 
                        onClick={() => onEdit(ticket)} 
                        className="ticket-btn ticket-edit-btn"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => onDelete(ticket)} 
                        className="ticket-btn ticket-delete-btn"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
}
