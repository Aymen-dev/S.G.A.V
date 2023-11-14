import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/services/user';
import { Ticket } from 'src/services/ticket';
import { DatePipe } from '@angular/common';
import { JournalService } from 'src/services/journal.service';

@Component({
  selector: 'app-journal-agent',
  templateUrl: './journal-agent.component.html',
  styleUrls: ['./journal-agent.component.css']
})
export class JournalAgentComponent {
  agentName!: string | null;
  sellerName!: string | null;
  showTickets = false;
  paymentCalculated = false;
  sellerPayment = 0;
  message!: string;
  sellers!: User[];
  tickets!: Ticket[];
  dateJournal: Date | null = new Date();


  constructor(private journalService: JournalService, private userService: UserService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.agentName = localStorage.getItem('username');
    this.userService.getSellers().subscribe({
      next: (response: any) => {
        this.sellers = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  get formattedDate(): string {
    return this.dateJournal ? this.datePipe.transform(this.dateJournal, 'd/MM/yyyy') as string : 'N/A';
  }

  onSellerClicked(sellerId: number, sellerName: string) {
    this.journalService.getJournal(sellerId)
      .subscribe(
        (response: any) => {
          if (response.status_code == 200) {
            this.tickets = response.data.tickets;
            this.showTickets = true;
            this.sellerName = sellerName;
          } else {
            this.tickets = [];
            this.message = "Cet utilisateur n'a pas encore transmit le journal d'aujourd'hui.";
          }
        },
        (error) => {
          this.message = "Erreur de connexion au serveur";
        }
      );
  }

  calculatePayment() {
    if (this.tickets && !this.paymentCalculated) {
      for (let ticket of this.tickets) {
        if (ticket.etat === "execute")
          this.sellerPayment += Number(ticket.prix) + Number(ticket.prix) * 0.2; //20% Commission;
        else
          this.sellerPayment += Number(ticket.prix);
      }
      this.paymentCalculated = true;
    }
  }
  
  back(){
    this.showTickets = false;
  }
}
