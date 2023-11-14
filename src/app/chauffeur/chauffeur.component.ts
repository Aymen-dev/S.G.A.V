import { Component } from '@angular/core';
import { Excursion } from 'src/services/excursion';
import { ExcursionService } from 'src/services/excursions.service';
import { Ticket } from 'src/services/ticket';
import { TicketService } from 'src/services/ticket.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
})
export class ChauffeurComponent {
  showTickets = false;
  excursions: Excursion[] = [];
  tickets: Ticket[] = [];
  chauffeurName!: string | null;
  excursionName!: string;
  dateExcursion!: any;
  formattedDate!: any;


  constructor(private excursionService: ExcursionService, private ticketService: TicketService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    const chauffeurID = localStorage.getItem('userId');
    this.chauffeurName = localStorage.getItem('username');
    if (chauffeurID) {
      const chauffeurIdNumber = parseInt(chauffeurID, 10);
      this.getExcursions(chauffeurIdNumber);
    }
  }

 

  onExcursionClicked(idExcursion: number, nom: string) {
    this.showTickets = true;
    this.excursionName = nom;
    const clickedExcursion = this.excursions.find(excursion => excursion.idExcursion === idExcursion);
    if (clickedExcursion) {
      this.dateExcursion = clickedExcursion.dateDebut;
      this.formattedDate = this.dateExcursion ? this.datePipe.transform(this.dateExcursion, 'yyyy-MM-dd') as string : null;
    }

    this.ticketService.getTicketsByExcursion(idExcursion)
      .subscribe({
        next: (response) => {
          if (Array.isArray(response.tickets))
            this.tickets = response.tickets;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  getExcursions(chauffeurID: number) {
    this.excursionService.getExcursionsByChauffeur(chauffeurID).subscribe({
      next: (response: any) => {
        if (Array.isArray(response.excursions))
          this.excursions = response.excursions;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
