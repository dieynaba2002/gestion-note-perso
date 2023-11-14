import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AuthComponent } from './auth/auth.component';
import {EvaluationComponent} from './evaluation/evaluation.component'

const routes: Routes = [
  {path: 'dashboard', component:DashboardAdminComponent},
  {path: 'auth', component:AuthComponent},
  {path:'evaluation', component:EvaluationComponent},
  {path: '', redirectTo:'auth', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
