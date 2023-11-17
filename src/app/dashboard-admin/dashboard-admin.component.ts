import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit{
  matiere:string='';
  idLastMatiere:number =0;

  tabMatiereRecup:any;
  tabMatiereAdmin:any;

  ngOnInit() {
    this.tabMatiereRecup=JSON.parse(localStorage.getItem('admin') || '[]')
    console.log(this.tabMatiereRecup)
    this.tabMatiereAdmin=this.tabMatiereRecup.matiere
    if (this.tabMatiereAdmin !=0) {
      this.idLastMatiere=this.tabMatiereAdmin[this.tabMatiereAdmin.length-1].idMatiere
    }
  }

  // creation de notre tableau d'objet
  
  ajouterMatiere(){
    if(this.matiere==''){
      this.showAlert('oups', 'Vous devez renseigner tous les champs', 'error')
    }else{
      let Matiere={
        idMatiere:this.idLastMatiere +1,
        nomMatiere:this.matiere,
        evaluation:[]
      }
      console.log(this.tabMatiereAdmin)
      this.tabMatiereAdmin.push(Matiere)
      localStorage.setItem('admin', JSON.stringify(this.tabMatiereRecup))
    }
  }

  showAlert(title:any, text:any, icon:any){
    Swal.fire({
      title:title,
      text:text,
      icon:icon
    })
  }
}
