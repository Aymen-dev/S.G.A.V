import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExcursionService } from 'src/services/excursions.service';
import { User } from 'src/services/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-excursion-form',
  templateUrl: './add-excursion-form.component.html',
  styleUrls: ['./add-excursion-form.component.css']
})
export class AddExcursionFormComponent {
  message: string = '';
  success = false;
  danger = false;
  nom!: string;
  destination!: string;
  description!: string;
  imgURL!: string;
  prix!: number;
  dateDebut!: string;
  dateFin!: string;
  idChauffeur!: string;
  chauffeurs: User[] = [];

  constructor(private excursionService: ExcursionService, private userService: UserService) { }

  @ViewChild('imageInput', { static: false }) imageInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.getChauffeurs();
    this.idChauffeur = '';
  }

  onSubmit(): void {
    // Perform form validation if required
    if (
      this.idChauffeur &&
      this.imageInput &&
      this.imageInput.nativeElement.files &&
      this.imageInput.nativeElement.files.length > 0
    ) {
      const idChauffeurNumber = parseInt(this.idChauffeur, 10);
      const imageFile = this.imageInput.nativeElement.files[0];
      this.excursionService
        .addExcursion(
          idChauffeurNumber,
          this.nom,
          this.destination,
          this.description,
          imageFile,
          this.prix,
          this.dateDebut,
          this.dateFin
        )
        .subscribe(
          (response: any) => {
            this.message = response.message;
            if (response.status_code === 200) {
              this.success = true;
              this.danger = false; // Reset danger flag on success
            } else {
              this.success = false;
              this.danger = true; // Set danger flag on failure
            }
          },
          (error) => {
            console.log(error);
            this.message = 'Une erreur est survenue, veuillez réessayer plus tard.';
            this.danger = true;
          }
        );
    }
  }

  getChauffeurs(): void {
    this.userService.getChauffeurs().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.chauffeurs = response.data;
        } else {
          this.chauffeurs = []; // Assign an empty array as a fallback
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
