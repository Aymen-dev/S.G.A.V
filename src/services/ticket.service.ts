import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ticket } from "./ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private addTicketURL = "http://localhost:8080/API/tickets/addTicket.php";
  private updateTicketStatusURL = "http://localhost:8080/API/tickets/updateTicketStatus.php";
  private deleteTicketURL = "http://localhost:8080/API/tickets/deleteTicket.php";
  private executeTicketURL = "http://localhost:8080/API/tickets/executeTicket.php";
  private transmitJournalURL = "http://localhost:8080/API/tickets/transmitJournal.php";
  private getTicketsURL = "http://localhost:8080/API/tickets/getTickets.php";
  private getTicketsOfTodayURL = "http://localhost:8080/API/tickets/getTicketsOfToday.php";
  private getTicketsByExcursionURL = "http://localhost:8080/API/tickets/getTicketsByExcursion.php";

  constructor(private http: HttpClient) { }

  getTicketsByExcursion(excursionId: number): Observable<any> {
    const url = `${this.getTicketsByExcursionURL}?id=${excursionId}`;
    return this.http.get<Ticket[]>(url);
  }

  addTicket(ticket: Ticket): Observable<any> {
    return this.http.post<any>(this.addTicketURL, ticket);
  }

  updateTicketStatus(id: number): Observable<any> {
    return this.http.put<any>(this.updateTicketStatusURL, id);
  }

  deleteTicket(id: number): Observable<any> {
    const url = `${this.deleteTicketURL}?id=${id}`;
    return this.http.delete<any>(url);
  }

  executeTicket(id: number): Observable<any> {
    const url = `${this.executeTicketURL}?id=${id}`;
    return this.http.put<any>(url, {});
  }

  transmitJournal(journal: Ticket[]): Observable<any> {
    return this.http.post<any>(this.transmitJournalURL, journal);
  }

  getTickets(userId: number): Observable<Ticket[]> {
    const url = `${this.getTicketsURL}?id=${userId}`;
    return this.http.get<Ticket[]>(url);
  }

  getTicketsOfToday(userId: number): Observable<Ticket[]> {
    const url = `${this.getTicketsOfTodayURL}?id=${userId}`;
    return this.http.get<Ticket[]>(url);
  }

}
