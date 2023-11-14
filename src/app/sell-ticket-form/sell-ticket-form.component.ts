import { Component, ViewChild } from '@angular/core';
import { TicketService } from 'src/services/ticket.service';
import { Ticket } from 'src/services/ticket';
import { ExcursionService } from 'src/services/excursions.service';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-sell-ticket-form',
  templateUrl: './sell-ticket-form.component.html',
  styleUrls: ['./sell-ticket-form.component.css']
})
export class SellTicketFormComponent {

  @ViewChild('sellTicketForm', { static: false }) sellTicketForm!: NgForm;

  danger = true;
  success = false;
  message = '';
  nomExcursion!: string;
  nbAdultes!: number;
  nbEnfants!: number;
  nbBebe!: number;

  constructor(private ticketService: TicketService, private excursionService: ExcursionService) { }

  onSubmit() {
    this.getExcursionID().subscribe((excursionId: number) => {
      if (excursionId !== 0) {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userIdNumber = parseInt(userId, 10);
          const ticket: Ticket = {
            num: 0, // Since it's auto-incremented, initialize with 0 or null
            idExcursion: excursionId,
            userId: userIdNumber,
            etat: 'vendu',
            prix: 0,
            nbAdultes: this.nbAdultes,
            nbEnfants: this.nbEnfants,
            nbBebe: this.nbBebe,
            dateVente: new Date()
          };

          this.ticketService.addTicket(ticket)
            .subscribe(
              (response) => {
                this.message = response.data;
                if (response.status_code == 200) {
                  this.danger = false;
                  this.success = true;
                  this.resetForm();
                }
              },
              (error) => {
                this.message = 'Erreur de connexion au serveur';
                console.log(error);
              }
            );
        }
        else
          this.message = 'Session utilisateur expirée!';
      } 
      else 
        this.message = 'Excursion inexistante';
      
    }, (error) => {
      this.message = 'Erreur de connexion au serveur';
      console.log(error);
    });
  }


  resetForm() {
    this.sellTicketForm.reset();
  }


  getExcursionID(): Observable<number> {
    return this.excursionService.getExcursionByName(this.nomExcursion)
      .pipe(
        map((response: any) => {
          if (response.status_code === 200) {
            return response.excursion.idExcursion;
          } else {
            this.message = response.data;
            return 0;
          }
        })
      );
  }

}
