import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-apprenants',
  templateUrl: './details-apprenants.component.html',
  styleUrls: ['./details-apprenants.component.css']
})
export class DetailsApprenantsComponent implements OnInit {
  currentApprenant:any;
  tabAdmin:any;

  constructor(private route: ActivatedRoute) {}
  idApprenantConnect = +this.route.snapshot.params['id'];
  tabCurrentApprenant:any[]=[];
  ngOnInit(): void {
    // On essaie de récupérer l'ID qui se trouve dans l'URL
    
    
    
    
  
    

    //recuperer notre localStorage
    this.tabAdmin = JSON.parse(localStorage.getItem('admin') || '[]');

    //Recuperer dans notre local storage le produit qui a l'idProduit(id qui ce trouve au niveau de l'url)
    this.currentApprenant = this.tabAdmin[0].apprenants.find((element:any) => element.idApprenant == this.idApprenantConnect);
    console.log(this.tabAdmin, 'db');
    console.log(this.idApprenantConnect, 'idProf');
    console.log(this.currentApprenant, 'currentProf');
    this.tabCurrentApprenant.push(this.currentApprenant);

  }
}
