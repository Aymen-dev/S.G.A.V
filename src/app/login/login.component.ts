import { Component, ViewChild } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  @ViewChild('loginForm')
  loginForm!: NgForm;
  username!: string;
  password!: string;
  message!: string;
  validCreds!: boolean;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        this.message = response.data;
        if (response.status_code === 200) {
          // Store session data in localStorage
          localStorage.setItem('loggedin', 'true');
          localStorage.setItem('username', this.username);
          localStorage.setItem('role', response.role);
          localStorage.setItem('userId', response.userId);  

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
          this.validCreds = true;
        } else {
          this.loginForm.reset();
          this.validCreds = false;
        }
      },
      error: (error) => {
        console.log(error);
        this.message = 'Une erreur est survenue, veuillez réessayer plus tard.';
      }
    });
  }
}
