const STORAGE_KEY = 'tickets';

function readTicketsFromStorage() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
        console.error("Error reading tickets from storage:", error);
        return [];
    }
}

function writeTicketsToStorage(tickets) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function simulateNetworkDelay(delay = 250) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function getTickets() {
    await simulateNetworkDelay();
    try {
        return readTicketsFromStorage();
    } catch (error) {
        throw new Error("Failed to fetch tickets. please try again. ");
    }
}

export async function createTicket(ticket) {
    await simulateNetworkDelay();
    try {
        const tickets = readTicketsFromStorage();
        const newTicket = { id: Date.now(), ...ticket };
        tickets.unshift(newTicket);
        writeTicketsToStorage(tickets);
        window.dispatchEvent(new Event('storage'));
        return newTicket;
    } catch (error) {
        throw new Error("Failed to create ticket. please try again. ");
    }
}

export async function updateTicket(id, updatedFields) {
    await simulateNetworkDelay();
    try {
        const tickets = readTicketsFromStorage();
        const ticketIndex = tickets.findIndex(ticket => ticket.id === id);
        if (ticketIndex === -1) throw new Error("Ticket not found");
        tickets[ticketIndex] = { ...tickets[ticketIndex], ...updatedFields };
        writeTicketsToStorage(tickets);
        window.dispatchEvent(new Event('storage'));
        return tickets[ticketIndex];
    } catch (error) {
        throw new Error("Failed to update ticket. please try again. ");
    }
}

export async function deleteTicket(id) {
    await simulateNetworkDelay();
    try {
        let tickets = readTicketsFromStorage();
        tickets = tickets.filter(ticket => ticket.id !== id);
        writeTicketsToStorage(tickets);
        window.dispatchEvent(new Event('storage'));
        return
    } catch (error) {
        throw new Error("Failed to delete ticket. please try again. ");
    }
}