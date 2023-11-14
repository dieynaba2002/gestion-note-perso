import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AuthComponent } from './auth/auth.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { FormsModule } from '@angular/forms';
import { DetailEvaluationComponent } from './detail-evaluation/detail-evaluation.component';
import { GestionNoteComponent } from './gestion-note/gestion-note.component';
import { GestionApprenantComponent } from './gestion-apprenant/gestion-apprenant.component';
import { DetailsApprenantsComponent } from './details-apprenants/details-apprenants.component';
import { ListeProfesseurComponent } from './liste-professeur/liste-professeur.component';
import { DetailsProfesseursComponent } from './details-professeurs/details-professeurs.component';
import { ListeNoteApprenantComponent } from './liste-note-apprenant/liste-note-apprenant.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardAdminComponent,
    AuthComponent,
    EvaluationComponent,
    DetailEvaluationComponent,
    GestionNoteComponent,
    GestionApprenantComponent,
    DetailsApprenantsComponent,
    ListeProfesseurComponent,
    DetailsProfesseursComponent,
    ListeNoteApprenantComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
