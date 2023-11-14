import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/services/ticket.service';
import { Ticket } from 'src/services/ticket';
import { DialogService } from 'src/services/dialog.service';
import { Journal } from 'src/services/journal';
import { JournalService } from 'src/services/journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  tickets: Ticket[] = [];
  sellerName!: string | null;
  message!: string;
  journalTransmitted = false;

  constructor(private ticketService: TicketService, private dialogService: DialogService
    , private journalService: JournalService) { }

  ngOnInit() {
    this.getTicketsForUser();
    this.sellerName = localStorage.getItem('username');
  }

  getTicketsForUser() {
    // Retrieve the user ID from localStorage or wherever it is stored
    const userId = localStorage.getItem('userId');

    if (userId) {
      const userIdNumber = parseInt(userId, 10);

      this.ticketService.getTicketsOfToday(userIdNumber)
        .subscribe(
          (response: any) => {
            if (response.status_code == 200)
              if (response && response.tickets && Array.isArray(response.tickets))
                this.tickets = response.tickets;
              else
                this.tickets = [];
            else
              this.message = response.data;
          },
          (error) => {
            console.log('Error fetching tickets:', error);
            this.message = "Erreur de connexion au serveur";
          }
        );
    } else {
      this.message = "Session expirée";
    }
  }

  openSellTicketDialog(): void {
    this.dialogService.openSellTicketDialog();
  }

  transmitJournal(): void {
    if (confirm("Transmettre le journal d'aujourd'hui ?")) {
      if (this.tickets.length != 0) {
        this.journalTransmitted = true;
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userIdNumber = parseInt(userId, 10);
          const journalEntry: Journal = {
            idJournal: 0, // Let the server generate the ID
            idVendeur: userIdNumber,
            tickets: this.tickets.map((ticket) => ({ ticketId: ticket.num })),
            dateTransmission: new Date()
          };

          this.journalService.createJournalEntry(journalEntry).subscribe(
            (response: any) => {
              this.message = response.data;
            },
            (error) => {
              this.message = "Erreur de connexion au serveur";
              console.log(error);
            }
          );
        }
        else {
          this.message = "Session utilisateur expirée!"
        }
      }
      else
        this.message = "Pas de tickets à transmettre";
    }
  }
}
