import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-note',
  templateUrl: './gestion-note.component.html',
  styleUrls: ['./gestion-note.component.css']
})
export class GestionNoteComponent implements OnInit {
  notes:any[]=[]
  apprenant:string = '';
  matiere:string='';
  typeEval:string='';
  scolaire:string='';
  semestre:string='';
  date:string='';
  classe:string='';
  note:string='';
  
//les element trouver
 
  idLastuserNote:number=0;
 
 
  db:any;


 notesRecup:any;
//  recuperation du tableau admin
  tabAdmins:any;
  tabAdminProf:any;
  tabAdminApprenant:any;
 
  idProf:any;
 filterValue:any;
  profConnect: any;

  evalChoisi:any;

 constructor(private route: ActivatedRoute) {};

 idEvalChoisi = this.route.snapshot.params['id'];


 ngOnInit() {
   this.tabAdmins=JSON.parse(localStorage.getItem('admin')|| '[]');

   
   this.tabAdminApprenant=this.tabAdmins[0].apprenants;
   console.log(this.tabAdminApprenant);
   this.tabAdminProf=this.tabAdmins[0].profs;
   const prof = this.findProfForEpreuve(this.idEvalChoisi);
   
   this.idProf = prof.idProf;
   this.profConnect = prof;
   this.evalChoisi=this.profConnect.evaluation.find((element:any)=> element.idEpreuve==this.idEvalChoisi)
   
   console.log(this.evalChoisi)

   this.typeEval=this.evalChoisi.type
   this.matiere=this.evalChoisi.matiere
   this.date=this.evalChoisi.jour
   this.classe=this.evalChoisi.classe;
   
  
   
   
 }

 
 findProfForEpreuve(idEpreuve: string): any {
  // Logique pour rechercher le professeur associé à l'épreuve
  // Ceci dépend de la structure de vos données

  if (this.tabAdmins && this.tabAdminProf) {
    for (const prof of this.tabAdminProf) {
      if (prof.evaluation && prof.evaluation.find((e:any )=> e.idEpreuve == this.idEvalChoisi)) {
        return prof;
      }
    }
  }

  return null;
}





 // vider champs
 viderChamps(){
  this.apprenant='';
   this.matiere='';
   this.typeEval='';
   this.scolaire='';
   this.semestre='';
   this.date=''; 
   this.classe='';
   this.note = ''; 
 }

 // methode pour ajouter notes
 ajouterNotes(){
   if(this.apprenant=='' || this.matiere=='' || this.typeEval==''|| this.scolaire=='' || this.semestre=='' || this.date=='' || this.classe=='' || this.note==''){
     this.showAlert('Oups', 'veuillez renseigner tous les champs', 'error')
   }else{

     let userNote={
       iduserNote: this.idLastuserNote +1,
       apprenant:this.apprenant,
       matiere:this.matiere,
       typeEval:this.typeEval,
       scolaire:this.scolaire,
       semestre:this.semestre,
       date:this.date,
       classe:this.classe,
       note:this.note,
      //  note:[]
     }
  
     console.log('Données avant stockage :', userNote);
     this.notesRecup.push(userNote);
     localStorage.setItem('notes', JSON.stringify(this.notesRecup))
     console.log(this.notesRecup)
     this.showAlert("Bravo","","success")
     console.log('Données après stockage :', userNote);


   }
   this.viderChamps()
 }
// methode pour suprimer une notes
 supprimer(paramnotes:any){
   Swal.fire({
     title: "Etes vous sur de vouloir supprimer cet notes?",
     text: "Etes vous sur de vouloir supprimer cet notes? ",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#007bff",
     cancelButtonColor: "#CE6A6B ",
     confirmButtonText: "oui, supprimer!"
   }).then((result) => {
     if (result.isConfirmed) {
        // on recupere l'indexe de l'element qu'on veut suprimer
       const indexElement=this.notesRecup.indexOf(paramnotes)
       // on verifie qu'il existe
       if(indexElement!=-1){
         //  supprimer 1 élément à partir de l'index spécifié dans la liste
        this.notesRecup.splice(indexElement, 1);
        localStorage.setItem('notes', JSON.stringify(this.notesRecup));
   }
       Swal.fire({
         title: "Felicitations...!",
         text: "L'notes a ete supprimer avec succes",
         icon: "success"
       });
     }
   });
  
 }

  showAlert(title:any, text:any, icon:any){
    Swal.fire({
      title:title,
      text:text,
      icon:icon
    })
  }
 currentNote:any;

 // methode pour charger info
  chargerInfo(parameval:any){
   this.currentNote=parameval;
   this.apprenant=parameval.apprenant;
   this.matiere=parameval.matiere;
   this.typeEval=parameval.typeEval;
   this.semestre=parameval.semestre;
   this.scolaire=parameval.scolaire;
   this.classe=parameval.classe;
   this.date=parameval.date
   this.note=parameval.note
  }

 // methode pour modifier une note
  modifier(){
  this.currentNote.apprenant=this.apprenant;
  this.currentNote.matiere=this.matiere;
  this.currentNote.typeEval=this.typeEval;
  this.currentNote.semestre=this.semestre;
  this.currentNote.scolaire=this.scolaire;
  this.currentNote.classe=this.classe;
  this.currentNote.date=this.date;
  this.currentNote.note=this.note;
  localStorage.setItem('notes', JSON.stringify(this.notesRecup));
  this.showAlert('Felicitations..', 'Note modifier  avec succes', 'success')
  this.viderChamps();
  }

  enregisterNote(){
   for (let i = 0; i < this.tabAdminApprenant.length; i++) {
    if(this.tabAdminApprenant[i].classe==this.classe){
      console.log(this.tabAdminApprenant[i].note)
      console.log(this.tabAdminApprenant[i].nom);
      console.log(this.tabAdminApprenant[i].prenom);
      console.log(this.tabAdminApprenant[i].classe);
      console.log(this.tabAdminApprenant[i].annee);
      let noteAprenant={
        idNoteApprenant:this.evalChoisi.note.length+1,
        nomApprenant:this.tabAdminApprenant[i].nom,
        prenomApprenant:this.tabAdminApprenant[i].prenom,
        classeApprenant:this.tabAdminApprenant[i].classe,
        anneeApprenant:this.tabAdminApprenant[i].annee,
        note:this.tabAdminApprenant[i].note,
      
      }
      this.evalChoisi.note.push(noteAprenant);
      localStorage.setItem('admin', JSON.stringify(this.tabAdmins));
      console.log(this.tabAdmins)
      

    }else if(this.tabAdminApprenant[i]=='') {
      this.verifChamps('Oups', 'Vous devez renseigner tous les champs', 'error');     
    }
    
   }
  }
    // fonction du sweetalert
    verifChamps(title:any, text:any, icon:any) {
      Swal.fire({
        title: title,
        text: text,
        icon: icon
      })
    }
  
}
