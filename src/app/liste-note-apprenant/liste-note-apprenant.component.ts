
import { Component, OnInit } from '@angular/core';

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

  tabNotes:any[] = [
    {
      id:1,
      nomComplet: "Dieynaba Coly",
      classe: "6eme",
      matiere: "Francais",
      semestre: "semestre 1",
      note: 18,
      prof: "Mr Seck",
      date: "10/10/2010"
    },
    {
      id:2,
      nomComplet: "Marie Coly",
      classe: "6eme",
      matiere: "Espagnol",
      semestre: "semestre 2",
      note: 18,
      prof: "Mr Seck",
      date: "22/02/2022"
    },
    {
      id:3,
      nomComplet: "Lobe Dia",
      classe: "3eme",
      matiere: "Maths",
      semestre: "semestre 1",
      note: 18,
      prof: "Mr Seck",
      date: "22/02/2022"
    },
  ]
  recupEval:any;

  ngOnInit(){
    this.recupEval=JSON.parse(localStorage.getItem('eval')|| '[]')
    console.log(this.recupEval)
  }
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.filteredElement = this.tabNotes.filter((elt: any) => {
    const nomComplet = elt?.nomComplet?.toLowerCase() || '';
    const date = elt?.date?.toLowerCase() || '';
    const anneeScolaire = elt?.anneeScolaire?.toLowerCase() || '';
      
    return nomComplet.includes(this.filterValue.toLowerCase()) || date.includes(this.filterValue.toLowerCase() )|| anneeScolaire.includes(this.filterValue.toLowerCase());
    });  
  }


}
