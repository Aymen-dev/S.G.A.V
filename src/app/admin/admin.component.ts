import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/services/dialog.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/services/user';
import { ExcursionService } from 'src/services/excursions.service';
import { Excursion } from 'src/services/excursion';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  excursions: Excursion[] = [];
  empCount!: number;
  excCount!: number;
  revenue!: number;
  username!: any;
  adminName!: string | null;
  constructor(private dialogService: DialogService,
    private userService: UserService, private excursionService: ExcursionService,
    private router: Router) {
    this.adminName = localStorage.getItem('username');
  }

  ngOnInit() {
    this.getUsers();
    this.getExcursions();
    this.adminName = localStorage.getItem('username');
    this.revenue = 0;
  }

  openAddEmployeeDialog(): void {
    this.dialogService.openAddEmployeeDialog();
  }
  openAddExcursionDialog(): void {
    this.dialogService.openAddExcursionDialog();
  }

  deleteUser(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        // Remove the deleted user from the users array
        this.users = this.users.filter(user => user.userId !== userId);
      });
    }
  }


  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.users = response.data;
        } else {
          this.users = []; // Assign an empty array as a fallback
        }
        this.empCount = this.users.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getExcursions(): void {
    this.excursionService.getExcursions().subscribe(
      (response: any) => {
        if (response.status_code === 200 && Array.isArray(response.data)) {
          this.excursions = response.data;
        } else {
          this.excursions = []; 
        }
        this.excCount = this.excursions.length;
        for (let i = 0; i < this.excursions.length; i++)
          this.revenue += Number(this.excursions[i].prix);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  deleteExcursion(excursionId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette excursion ?')) {
      this.excursionService.deleteExcursion(excursionId).subscribe(() => {
        // Remove the deleted excursion from the excursions array
        this.excursions = this.excursions.filter(excursion => excursion.idExcursion !== excursionId);
      });
    }
  }


  formatDate(date: string): string {
    // Implement your date formatting logic here
    return new Date(date).toLocaleDateString();
  }

}

