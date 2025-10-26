import React,  { useEffect, useState } from "react";
import { validateTicketForm, ALLOWED_STATUSES } from "../src/utilities/ticketValidators";

export default function TicketForm({ initialData = {}, onSubmit, onCancel, submitLabel = "save" }) {
    const [form, setForm] = useState({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "open",
        priority: initialData.priority || "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const e = validateTicketForm(form);
        setErrors(e);
    }, [form]);

    function setField(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    function isValid(){
        const e = validateTicketForm(form);
        return Object.values(e).every( v => v === "");
    }

    function handleSubmit(e) {
        e.preventDefault();
        const eObj = validateTicketForm(form);
        setErrors(eObj);
        if (Object.values(eObj).some(v => v !== "")) {
            return;
        }
        onSubmit({
            title: form.title.trim(),
            description: form.description.trim(),
            status: form.status,
            priority: form.priority ? form.priority : null
        });
    }

    return (
        <form className="ticket-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="ticket-title">Title:</label>
            <input
                type="text"
                id="ticket-title"
                value={form.title}
                onChange={e => setField("title", e.target.value)}
                aria-invalid={errors.title ? "true" : "false"}
                aria-describedby={errors.title ? "ticket-title-error" : undefined}
            />
            {errors.title && <div id="ticket-title-error" className="error-message">{errors.title}</div>}

            <label htmlFor="status">Status:</label>
            <select
                id="status"
                value={form.status}
                onChange={e => setField("status", e.target.value)}
                aria-invalid={errors.status ? "true" : "false"}
                aria-describedby={errors.status ? "ticket-status-error" : undefined}
            >
                {ALLOWED_STATUSES.map(status => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            {errors.status && <div id="ticket-status-error" className="error-message">{errors.status}</div>}

            <label htmlFor="ticket-description">Description:</label>
            <textarea
                id="ticket-description"
                value={form.description}
                onChange={e => setField("description", e.target.value)}
                aria-invalid={errors.description ? "true" : "false"}
                aria-describedby={errors.description ? "ticket-description-error" : undefined}
            />
            {errors.description && <div id="ticket-description-error" className="error-message">{errors.description}</div>}

            <label htmlFor="ticket-priority">Priority (1-5):</label>
            <input
                type="number"
                id="ticket-priority"
                value={form.priority || ""}
                onChange={e => setField("priority", e.target.value)}
                aria-invalid={errors.priority ? "true" : "false"}
                aria-describedby={errors.priority ? "ticket-priority-error" : undefined}
            />
            {errors.priority && <div id="ticket-priority-error" className="error-message">{errors.priority}</div>}

            <div className="form-buttons">
                <button type="submit" disabled={!isValid()} className="ticket-btn ticket-submit-btn">
                    {submitLabel.charAt(0).toUpperCase() + submitLabel.slice(1)}
                </button>
                <button type="button" onClick={onCancel} className="ticket-btn ticket-cancel-btn">
                    Cancel
                </button>
            </div>
        </form>
    )
}