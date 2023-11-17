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

 notesRecup:any;

 filterValue:any;
 ngOnInit() {
   if (!localStorage.getItem('notes')) {
     localStorage.setItem('notes', JSON.stringify(this.notes));
   }
   this.notesRecup=JSON.parse(localStorage.getItem('notes') || '[]')
   console.log(this.notesRecup)
   this.filteredElements = this.notesRecup;
   
   if(this.notesRecup.length !=0){
     this.idLastuserNote=this.notesRecup[this.notesRecup.length-1].iduserNote
   }

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

filteredElements: any[] = []; 

 // Recherche
  onSearch() {
    const searchTerm = this.filterValue.toLowerCase();
    this.filteredElements = this.notesRecup.filter((element: any) => {
      const apprenant = (element.apprenant || '').toLowerCase();
      const date = (element.date || '').toLowerCase();
      const matiere = (element.matiere || '').toLowerCase();
      const typeEval = (element.typeEval || '').toLowerCase();
      const classe = (element.classe || '').toLowerCase();
  
      return (
        apprenant.includes(searchTerm) ||
        date.includes(searchTerm) ||
        matiere.includes(searchTerm) ||
        typeEval.includes(searchTerm) ||
        classe.includes(searchTerm) 
      );
    });
  }
  
}
