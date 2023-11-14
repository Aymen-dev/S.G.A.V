import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SystemeGestionAgenceDeVoyage';
  ngOnInit() {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem('loggedin') === 'true';

    if (isLoggedIn)
      localStorage.setItem('loggedIn', 'false'); 
  }
}
