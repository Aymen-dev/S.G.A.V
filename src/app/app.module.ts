import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { TicketComponent } from './ticket/ticket.component';
import { AdminComponent } from './admin/admin.component';
import { AddEmployeeFormComponent } from './add-employee-form/add-employee-form.component';
import { AddExcursionFormComponent } from './add-excursion-form/add-excursion-form.component';
import { JournalComponent } from './journal/journal.component';
import { SellTicketFormComponent } from './sell-ticket-form/sell-ticket-form.component';
import { JournalAgentComponent } from './journal-agent/journal-agent.component';
import { DatePipe } from '@angular/common';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    TicketComponent,
    AdminComponent,
    AddEmployeeFormComponent,
    AddExcursionFormComponent,
    JournalComponent,
    SellTicketFormComponent,
    JournalAgentComponent,
    ChauffeurComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
