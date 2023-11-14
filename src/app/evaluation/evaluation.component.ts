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
   hoy=new Date()

   idLastEpreuve:number=0;

  evalRecup:any;


  textButton:string='';
  ngOnInit() {
    if (!localStorage.getItem('eval')) {
      localStorage.setItem('eval', JSON.stringify(this.evaluation));
    }
    this.evalRecup=JSON.parse(localStorage.getItem('eval') || '[]')
    console.log(this.evalRecup)
    
    if(this.evalRecup.length){
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
  }

  // methode pour ajouter evaluation
  ajouterEval(){
    if(this.matiere=='' || this.type==''|| this.annee=='' || this.semestre=='' || this.jour==''){
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
        classe:this.classe
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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        parameval.etat=-1
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
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

  isDateAnterieure(date: Date): boolean {
    const aujourdHui = new Date();
    return date < aujourdHui;
  }
}
