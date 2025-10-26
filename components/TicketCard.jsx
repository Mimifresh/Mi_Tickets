import React from 'react';

export default function TicketCard({ ticket, onEdit, onDelete }) {

    const statusLabel = ticket.status || 'Unknown';
    const tagClass = `status-tag status-${statusLabel.toLowerCase()}`;
    return (
        <article className="ticket-card"
        role="article"
        tabIndex="0"
        aria-labelledby={`ticket-title-${ticket.id}`}
        aria-describedby={`ticket-desc-${ticket.id}
        ticket-status-${ticket.id}`}>
            </article>
    );
}
