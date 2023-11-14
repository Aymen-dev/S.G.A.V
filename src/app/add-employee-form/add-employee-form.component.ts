import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent {
  message: string = '';
  success = false;
  danger = false; // Add danger flag
  name!: string;
  phone!: string;
  cin!: string;
  username!: string;
  password!: string;
  role!: string;

  constructor(private userService: UserService) { }

  ngOnInit(){
    this.role = '';
  }

  onSubmit(): void {

    // Perform form validation for password and cin
    if (this.password.length < 5) {
      this.message = 'Le mot de passe doit contenir au moins 5 caractères.';
      this.danger = true;
      return;
    }

    if (this.cin.length !== 8 || !/^\d+$/.test(this.cin)) {
      this.message = 'Le CIN doit contenir exactement 8 caractères numériques.';
      this.danger = true;
      return;
    }

    this.userService.addUser(this.name, this.phone, this.cin, this.username, this.password, this.role)
      .subscribe({
        next: (response: any) => {
          this.message = response.data;
          if (response.status_code === 200) {
            this.success = true;
            this.danger = false; // Reset danger flag on success
          } else {
            this.success = false;
            this.danger = true; // Set danger flag on failure
          }
        },
        error: (error) => {
          console.log(error);
          this.message = 'Une erreur est survenue, veuillez réessayer plus tard.';
          this.danger = true;
        }
      });
  }
}
