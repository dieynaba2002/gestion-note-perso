import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-liste-professeur',
  templateUrl: './liste-professeur.component.html',
  styleUrls: ['./liste-professeur.component.css']
})
export class ListeProfesseurComponent implements OnInit {
  profs:any[]=[]

 
  matiere:string='';
  nom:string='';
  annee:string='';
  prenom:string='';
  classe:string='';
  email:string='';
  role:string='';
  telephone:string='';
  etat:string="active";

 

  idLastProf:number=0;

 profRecup:any;

 filterValue:any;
 textButton:string='';
 ngOnInit() {
   if (!localStorage.getItem('profs')) {
     localStorage.setItem('profs', JSON.stringify(this.profs));
   }
   this.profRecup=JSON.parse(localStorage.getItem('profs') || '[]')
   console.log(this.profRecup)
   
   if(this.profRecup.length !=0){
     this.idLastProf=this.profRecup[this.profRecup.length-1].idProf
   }
   

 }

 // vider champs
 viderChamps(){
   this.matiere='';
   this.nom='';
   this.annee='';
   this.telephone='';
   this.prenom=''; 
   this.classe=''; 
   this.email=''; 
 }

 // methode pour ajouter profuation
 ajouterprof(){
   if(this.matiere=='' || this.nom==''|| this.annee=='' || this.prenom=='' || this.telephone=='' || this.email==''){
     this.showAlert('Oups', 'veuillez renseigner tous les champs', 'error')
   }else{
     
     let Prof={
       idProf: this.idLastProf +1,
       matiere:this.matiere,
       nom:this.nom,
       annee:this.annee,
       prenom:this.prenom,
       email:this.email,
       telephone:this.telephone,
       etat:'active'
     }
     console.log(Prof);
     this.profRecup.push(Prof);
     localStorage.setItem('profs', JSON.stringify(this.profRecup))
     console.log(this.profRecup)


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
//   localStorage.setItem('profs', JSON.stringify(this.profRecup))
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
