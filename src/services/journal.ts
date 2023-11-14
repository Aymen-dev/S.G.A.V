export interface Journal {
    idJournal: number;
    idVendeur: number;
    tickets: TicketData[];
    dateTransmission: Date;
}

interface TicketData {
    ticketId: number;
}