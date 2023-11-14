import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmployeeFormComponent } from 'src/app/add-employee-form/add-employee-form.component';
import { AddExcursionFormComponent } from 'src/app/add-excursion-form/add-excursion-form.component';
import { SellTicketFormComponent } from 'src/app/sell-ticket-form/sell-ticket-form.component';


@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  dialogConfig: MatDialogConfig = {
    width: '1000px',
    maxHeight: '600px',
  }
  openAddEmployeeDialog(): void {
    this.dialog.open(AddEmployeeFormComponent, this.dialogConfig);
  }
  openAddExcursionDialog(): void {
    this.dialog.open(AddExcursionFormComponent, this.dialogConfig);
  }
  openSellTicketDialog(): void {
    this.dialog.open(SellTicketFormComponent, this.dialogConfig);
  }

}
