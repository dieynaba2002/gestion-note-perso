import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-apprenant',
  templateUrl: './gestion-apprenant.component.html',
  styleUrls: ['./gestion-apprenant.component.css']
})
export class GestionApprenantComponent implements OnInit{

  apprenants:any[]=[]

  nom:string='';
  annee:string='';
  prenom:string='';
  classe:string='';
  email:string='';
  adresse: string = '';
  dateNaiss: string = '';
  role:string='';
  telephone:string='';
  etat:string="active";

 
 idLastApprenant:number=0;

 apprenantsRecup:any;
 apprenantRecupAdmin:any;

 filterValue:any;
 textButton:string='';
 ngOnInit() {
  
   this.apprenantsRecup=JSON.parse(localStorage.getItem('admin') || '[]')
   console.log(this.apprenantsRecup ,' tableau recupere')
   this.apprenantRecupAdmin=this.apprenantsRecup[0].apprenants
   console.log(this.apprenantRecupAdmin ,' tableau apprenant')

   if(this.apprenantRecupAdmin.length ){
     this.idLastApprenant=this.apprenantRecupAdmin[this.apprenantRecupAdmin.length-1].idApprenant
   }
   

 }

 // vider champs
 viderChamps(){
   this.adresse='';
   this.nom='';
   this.annee='';
   this.telephone='';
   this.prenom=''; 
   this.classe=''; 
   this.email = ''; 
   this.role = '';
 }

 // methode pour ajouter profuation
 ajouterprof(){
   if(this.adresse=='' || this.nom==''|| this.annee=='' || this.prenom=='' || this.telephone=='' || this.email==''){
     this.showAlert('Oups', 'veuillez renseigner tous les champs', 'error')
   }else{
     
     let Apprenant={
      idApprenant: this.apprenantRecupAdmin.length + 1,
       adresse:this.adresse,
       nom:this.nom,
       annee: this.annee,
       classe: this.classe,
       prenom:this.prenom,
       email:this.email,
       telephone: this.telephone,
       dateNaiss: this.dateNaiss,
       role: this.role,
       etat:'active',
       password:'passer123',
       note:[]
     }
     console.log(this.apprenantRecupAdmin);
     this.apprenantRecupAdmin.push(Apprenant);
     localStorage.setItem('admin', JSON.stringify(this.apprenantsRecup))
     console.log(this.apprenantsRecup)


   }
   this.viderChamps()
 }






 showAlert(title:any, text:any, icon:any){
   Swal.fire({
     title:title,
     text:text,
     icon:icon
   })
 }
// profChoisi:any;
// // recupere l'objet
// recup(paramProf: any){
//   this.profChoisi=paramProf;

// }
// // methode pour changer le texte du bouton
//  desactiverProf(){
//   this.profChoisi.etat='desactive'
//   localStorage.setItem('apprenants', JSON.stringify(this.profRecup))
//  }
//  activerProf(){
//   this.profChoisi.etat='active'
//   localStorage.setItem('profs', JSON.stringify(this.profRecup))
//  }

toggleEtat(prof: any) {
  prof.etat = (prof.etat === 'active') ? 'inactive' : 'active';
  // Vous pouvez ajouter ici la logique pour mettre à jour l'état du professeur dans votre base de données ou tout autre traitement nécessaire
}

}
