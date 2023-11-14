import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router){}
  isLoggedIn = false;
  userRole: string | null = null;

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  isAgent(): boolean {
    return this.userRole === 'agent';
  }

  isSeller(): boolean {
    return this.userRole === 'vendeur';
  }

  isChauffeur(): boolean {
    return this.userRole === 'chauffeur';
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.userRole = localStorage.getItem('role');
  }

  checkLoginStatus() {
    const loggedIn = localStorage.getItem('loggedin');
    this.isLoggedIn = loggedIn === 'true';
  }

  logout() {
    localStorage.removeItem('loggedin');
    localStorage.removeItem('role'); // Remove the role from localStorage
    this.isLoggedIn = false;
    this.userRole = null; // Reset the userRole property
  }

  redirect() {
    this.router.navigate(['/']);
  }
  
}
