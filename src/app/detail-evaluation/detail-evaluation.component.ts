import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-evaluation',
  templateUrl: './detail-evaluation.component.html',
  styleUrls: ['./detail-evaluation.component.css']
})
export class DetailEvaluationComponent {
  annee:string='';
  niveaux:string='';
  
//les element trouver
   listeClasse:any;
   idLastEpreuve:number=0;

   classeRecup:any;
   tabClasse:any;

 ngOnInit() {
      this.classeRecup=JSON.parse(localStorage.getItem('admin') || '[]');
      console.log(this.classeRecup[0].profs[0].classe)
      
 }

 // vider champs
 viderChamps(){
   this.annee='';
   this.niveaux=''; 
 }

 // methode pour ajouter evaluation
 ajouterClasse(){
   if( this.annee=='' ||  this.niveaux==''){
    
   }else{
     let Classe={
       idEpreuve: this.idLastEpreuve +1,
       annee:this.annee,
       classe:this.niveaux,
       effectif:[]
     }
     console.log(Classe);
     this.tabClasse=this.classeRecup[0].profs[0].classe.push(Classe);
     console.log(this.tabClasse);
     

     this.viderChamps();
   }
 }
  
 }






 
 



