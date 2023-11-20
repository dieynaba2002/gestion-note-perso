import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-professeurs',
  templateUrl: './details-professeurs.component.html',
  styleUrls: ['./details-professeurs.component.css']
})
export class DetailsProfesseursComponent implements OnInit {
  
  currentProf:any;
  tabAdmin:any;

  constructor(private route: ActivatedRoute) {}
  idProfConnect = +this.route.snapshot.params['id'];
  tabCurrentProf:any[]=[];
  ngOnInit(): void {
    // On essaie de récupérer l'ID qui se trouve dans l'URL
    
    
    
    
  
    

    //recuperer notre localStorage
    this.tabAdmin = JSON.parse(localStorage.getItem('admin') || '[]');

    //Recuperer dans notre local storage le produit qui a l'idProduit(id qui ce trouve au niveau de l'url)
    this.currentProf = this.tabAdmin[0].profs.find((element:any) => element.idProf == this.idProfConnect);
    console.log(this.tabAdmin, 'db');
    console.log(this.idProfConnect, 'idProf');
    console.log(this.currentProf, 'currentProf');
    this.tabCurrentProf.push(this.currentProf) ;

  }
}
