import { Component,  OnInit  } from '@angular/core';
import Swal  from 'sweetalert2'
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
   evaluation:any[]=[]
   matiere:string='';
   type:string='';
   annee:string='';
   semestre:string='';
   jour:string='';
   classe:string='';
   
 //les element trouver
  
   idLastEpreuve:number=0;

  evalRecup:any;

  filterValue:any;
  textButton:string='';
  ngOnInit() {
    if (!localStorage.getItem('eval')) {
      localStorage.setItem('eval', JSON.stringify(this.evaluation));
    }
    this.evalRecup=JSON.parse(localStorage.getItem('eval') || '[]')
    console.log(this.evalRecup)
    
    if(this.evalRecup.length !=0){
      this.idLastEpreuve=this.evalRecup[this.evalRecup.length-1].idEpreuve
    }

  }

  // vider champs
  viderChamps(){
    this.matiere='';
    this.type='';
    this.annee='';
    this.semestre='';
    this.jour=''; 
    this.classe=''; 
  }

  // methode pour ajouter evaluation
  ajouterEval(){
    if(this.matiere=='' || this.type==''|| this.annee=='' || this.semestre=='' || this.jour=='' || this.classe==''){
      this.showAlert('Oups', 'veuillez renseigner tous les champs', 'error')
    }else{
      const aujourdHui = new Date();
      const jours=new Date(this.jour)
      if( jours < aujourdHui){
        this.textButton='faite';
      
      }else{
        this.textButton='En cours';
      }
      let epreuve={
        idEpreuve: this.idLastEpreuve +1,
        matiere:this.matiere,
        type:this.type,
        annee:this.annee,
        semestre:this.semestre,
        jour:this.jour,
        etat:this.textButton,
        classe:this.classe,
        note:[]
      }
      console.log(epreuve);
      this.evalRecup.push(epreuve);
      localStorage.setItem('eval', JSON.stringify(this.evalRecup))
      console.log(this.evalRecup)


    }
    this.viderChamps()
  }
// methode pour suprimer une evaluation
  supprimer(parameval:any){
    Swal.fire({
      title: "Etes vous sur de vouloir supprimer cet evaluation?",
      text: "Etes vous sur de vouloir supprimer cet evaluation? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#CE6A6B ",
      confirmButtonText: "oui, supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
         // on recupere l'indexe de l'element qu'on veut suprimer
        const indexElement=this.evalRecup.indexOf(parameval)
        // on verifie qu'il existe
        if(indexElement!=-1){
          //  supprimer 1 élément à partir de l'index spécifié dans la liste
         this.evalRecup.splice(indexElement, 1);
         localStorage.setItem('eval', JSON.stringify(this.evalRecup));
    }
        Swal.fire({
          title: "Felicitations...!",
          text: "L'evaluation a ete supprimer avec succes",
          icon: "success"
        });
      }
    });
   
  }

 
  // methode pour reporter une evaluation
  reporterEvaluation(parameval:any){
    parameval.etat='reporté'
    localStorage.setItem('eval', JSON.stringify(this.evalRecup))
  }

  showAlert(title:any, text:any, icon:any){
    Swal.fire({
      title:title,
      text:text,
      icon:icon
    })
  }

  currentEpreuve:any;
// methode pour charger info
chargerInfo(parameval:any){
  this.currentEpreuve=parameval;
  this.matiere=parameval.matiere;
  this.type=parameval.type;
  this.semestre=parameval.semestre;
  this.annee=parameval.annee;
  this.classe=parameval.classe;
  this.jour=parameval.jour

}

// methode pour reprogrammer
reprogramer(){
  this.currentEpreuve.matiere=this.matiere;
  this.currentEpreuve.type=this.type;
  this.currentEpreuve.semestre=this.semestre;
  this.currentEpreuve.annee=this.annee;
  this.currentEpreuve.classe=this.classe;
  this.currentEpreuve.jour=this.jour;
  this.currentEpreuve.etat='En cours';
  localStorage.setItem('eval', JSON.stringify(this.evalRecup));
  this.showAlert('Felicitations..', 'evaluation reprogrammer  avec succes', 'success')
}
  
}
