import { Component,  OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal  from 'sweetalert2'


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
   evaluations:any[]=[]
   matiere:string='';
   type:string='';
   annee:string='';
   semestre:string='';
   jour:string='';
   classe:string='';
   
 //les element trouver
  listeEvaluations:any;
  idLastEpreuve:number=0;

  evalRecup: any;
  
  tabAdminEval: any;

  tabAdmin: any;
  matiereProfConnect: any;
  profConnect: any;

  profConnectEval: any;

  filtreAnnee:string='';
  textButton:string='';




  ngOnInit() {
    if (!localStorage.getItem('eval')) {
      localStorage.setItem('eval', JSON.stringify(this.evaluations));
    }
    this.evalRecup=JSON.parse(localStorage.getItem('eval') || '[]')
    console.log(this.evalRecup)
    
    if(this.evalRecup.length !=0){
      this.idLastEpreuve=this.evalRecup[this.evalRecup.length-1].idEpreuve
    }

    this.tabAdmin = JSON.parse(localStorage.getItem('admin') || '[]');
    
    this.tabAdminEval = this.tabAdmin[0].profs
    console.log(this.tabAdminEval)

    this.profConnect = this.tabAdminEval.find((element: any) => element.idProf == this.idProfConnect);
    this.matiereProfConnect=this.profConnect.matiere
    this.profConnectEval = this.profConnect.evaluation;
    console.log(this.matiereProfConnect);
  }



  constructor(private route: ActivatedRoute, private router: Router) {};
  idProfConnect = this.route.snapshot.params['id'];

  

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
        idEpreuve: this.profConnectEval.length + 1,
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
      this.profConnectEval.push(epreuve);
      localStorage.setItem('admin', JSON.stringify(this.tabAdmin))
      console.log(this.profConnectEval)


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
        const indexElement=this.profConnectEval.indexOf(parameval)
        // on verifie qu'il existe
        if(indexElement!=-1){
          //  supprimer 1 élément à partir de l'index spécifié dans la liste
         this.profConnectEval.splice(indexElement, 1);
         localStorage.setItem('eval', JSON.stringify(this.profConnectEval));
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
    localStorage.setItem('eval', JSON.stringify(this.profConnectEval))
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
  localStorage.setItem('eval', JSON.stringify(this.profConnectEval));
  this.showAlert('Felicitations..', 'evaluation reprogrammer  avec succes', 'success')
}



// filtrer evaluation selon l'annee scolaire
onSearch(){
  this.listeEvaluations = this.profConnectEval.filter(
    (elt:any) => (elt?.annee.includes(this.filtreAnnee)));
    console.log(this.listeEvaluations);

}

//Pour la ridirection de ma page liste à detail
navigateToDetails(id: number): void {
  this.router.navigate(['/gestionnote', id]);
}

}