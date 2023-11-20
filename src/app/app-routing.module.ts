import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AuthComponent } from './auth/auth.component';
import {EvaluationComponent} from './evaluation/evaluation.component';
import {ListeProfesseurComponent} from './liste-professeur/liste-professeur.component';
import {GestionApprenantComponent} from './gestion-apprenant/gestion-apprenant.component';
import { ListeNoteApprenantComponent } from './liste-note-apprenant/liste-note-apprenant.component';
import { GestionNoteComponent } from './gestion-note/gestion-note.component';
import { DetailsProfesseursComponent } from './details-professeurs/details-professeurs.component';

import { DetailsApprenantsComponent } from './details-apprenants/details-apprenants.component';

const routes: Routes = [
  {path: 'dashboard', component:DashboardAdminComponent},
  {path: 'auth', component:AuthComponent},
  {path:'evaluation/:id', component:EvaluationComponent},
  {path: '', redirectTo:'auth', pathMatch:'full'},
  {path:'listeprofesseur', component:ListeProfesseurComponent},
  {path:'gestionapprenant', component:GestionApprenantComponent},
  {path:'listenoteapprenant/:id', component:ListeNoteApprenantComponent},
  {path:'gestionnote/:id', component:GestionNoteComponent},
  {path:'detail-professeur/:id', component:DetailsProfesseursComponent},
  {path:'detail-apprenant/:id', component:DetailsApprenantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
