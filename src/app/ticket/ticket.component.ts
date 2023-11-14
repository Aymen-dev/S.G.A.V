import { Component, Input } from '@angular/core';
import { Ticket } from 'src/services/ticket';
import { TicketService } from 'src/services/ticket.service';
import { UserService } from 'src/services/user.service';
import { ExcursionService } from 'src/services/excursions.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  @Input() ticket!: Ticket;
  sellerName!: string;
  excursionName!: string;
  role!: string | null;

  constructor(private userService: UserService, private excursionService: ExcursionService, private ticketService: TicketService) { }

  ngOnInit() {
    this.setSellerName();
    this.setExcursionName();
    this.role = localStorage.getItem('role');
  }


  setSellerName(): void {
    this.userService.getUserById(this.ticket.userId)
      .subscribe({
        next: (response) => {
          this.sellerName = response.nom;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  setExcursionName(): void {
    this.excursionService.getExcursionById(this.ticket.idExcursion)
      .subscribe({
        next: (response) => {
          this.excursionName = response.nom;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  cancelTicket() {
    if (confirm('Annuler ce ticket ?')) {
      if (this.ticket.etat == 'vendu') {
        this.ticketService.updateTicketStatus(this.ticket.num)
          .subscribe({
            next: (response) => {
              alert(response.data);
            },
            error: () => {
              alert('Erreur de connexion au serveur');
            }
          })
      }
      else
        alert("Erreur d'annulation du ticket");
    }
  }

  deleteTicket() {
    if (confirm('Supprimer ce ticket ?')) {
      this.ticketService.deleteTicket(this.ticket.num)
        .subscribe({
          next: (response) => {
            alert(response.data);
          },
          error: () => {
            alert('Erreur de connexion au serveur');
          }
        })
    }
  }

  executeTicket() {
    if (confirm('Marquer ce ticket executé ?')) {
      if (this.ticket.etat !== 'execute') {
        this.ticketService.executeTicket(this.ticket.num)
          .subscribe({
            next: (response) => {
              alert(response.data);
            },
            error: () => {
              alert('Erreur de connexion au serveur');
            }
          })
      }
      else
        alert('Erruer d\'execution du ticket');
    }
  }
}
