
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liste-note-apprenant',
  templateUrl: './liste-note-apprenant.component.html',
  styleUrls: ['./liste-note-apprenant.component.css']
})
export class ListeNoteApprenantComponent implements OnInit{

  // les attributs
  // nomComplet: string = "";
  classe: string = "";
  matiere: string = "";
  semestre: string = "";
  note: number = 0;
  prof: string = "";
  date: string = "";

  //les element trouver
  filteredElement:any;
  
  //valeur du filter qui correspond a celui du champs recherche
  filterValue = "";
 tabAdmin:any;
 apprenantConnect:any;
  recupEval:any;

  constructor(private route: ActivatedRoute){}
  idApprenatConnect=this.route.snapshot.params['id'];
  tabApprenant:any[]=[];


  ngOnInit(){
    this.tabAdmin=JSON.parse(localStorage.getItem('admin')||'[]');
    this.apprenantConnect=this.tabAdmin[0].apprenants.find((element: any)=> element.idApprenant==this.idApprenatConnect);
    console.log(this.tabApprenant)
    console.log(this.tabAdmin[0].profs)
    this.tabApprenant.push(this.apprenantConnect)
  }
 


}
