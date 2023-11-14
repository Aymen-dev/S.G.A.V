import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { JournalComponent } from './journal/journal.component';
import { JournalAgentComponent } from './journal-agent/journal-agent.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-about', component: AboutComponent },
  { path: 'app-admin', component: AdminComponent},
  { path: 'app-journal', component: JournalComponent},
  { path: 'app-journal-agent', component: JournalAgentComponent},
  { path: 'app-chauffeur', component: ChauffeurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
