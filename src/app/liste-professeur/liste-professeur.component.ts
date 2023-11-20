import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
  tabProfAdmin:any;
  filterValue:any;
  textButton: string = '';
  visibleContenue:boolean = true;
  

  constructor(private router: Router) {}

 ngOnInit() {
 
   this.profRecup=JSON.parse(localStorage.getItem('admin') || '[]')
   this.tabProfAdmin=this.profRecup[0].profs
   console.log(this.tabProfAdmin ,'liste prof')
   if(this.tabProfAdmin.length!=0){
     this.idLastProf=this.tabProfAdmin[this.tabProfAdmin.length-1].idProf
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
   if(this.matiere=='' || this.nom==''|| this.annee=='' || this.prenom=='' || this.telephone=='' || this.email=='' || this.role==''){
     this.showAlert('Oups', 'veuillez renseigner tous les champs', 'error')
   }else{
     
     let Prof={
       idProf: this.tabProfAdmin.length + 1,
       matiere:this.matiere,
       nom:this.nom,
       annee:this.annee,
       prenom:this.prenom,
       email:this.email,
       telephone:this.telephone,
       etat:'active',
       password:'passer',
       role: this.role,
       evaluation:[]
     }
     console.log(this.tabProfAdmin);
     this.tabProfAdmin.push(Prof);
     localStorage.setItem('admin', JSON.stringify(this.profRecup))
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
  

toggleEtat(prof: any) {
  prof.etat = (prof.etat === 'active') ? 'inactive' : 'active';
  localStorage.setItem('admin', JSON.stringify(this.profRecup));
  // Vous pouvez ajouter ici la logique pour mettre à jour l'état du professeur dans votre base de données ou tout autre traitement nécessaire
}

//Pour la ridirection de ma page liste à detail
navigateToDetails(id: number): void {
  this.router.navigate(['/detail-professeur', id]);
}

}