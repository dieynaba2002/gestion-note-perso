import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AuthComponent } from './auth/auth.component';
import {EvaluationComponent} from './evaluation/evaluation.component';
import {ListeProfesseurComponent} from './liste-professeur/liste-professeur.component';
import {GestionApprenantComponent} from './gestion-apprenant/gestion-apprenant.component';
import { ListeNoteApprenantComponent } from './liste-note-apprenant/liste-note-apprenant.component';
import { GestionNoteComponent } from './gestion-note/gestion-note.component';



const routes: Routes = [
  {path: 'dashboard', component:DashboardAdminComponent},
  {path: 'auth', component:AuthComponent},
  {path:'evaluation', component:EvaluationComponent},
  {path: '', redirectTo:'auth', pathMatch:'full'},
  {path:'listeprofesseur', component:ListeProfesseurComponent},
  {path:'gestionapprenant', component:GestionApprenantComponent},
  {path:'listenoteapprenant', component:ListeNoteApprenantComponent},
  {path:'gestionnote', component:GestionNoteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
