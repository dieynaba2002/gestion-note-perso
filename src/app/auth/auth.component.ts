import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Admin } from '../model/Admin';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  // les attributs
  idlastAdmin:number = 0;

  userProfFound:any;
  userApprenantFound:any;

  nom:string= "";
  prenom:string= "";
  email:string= "";
  password: string = "";

  formChoice = true;
  adminConnect:any;
  // Tableau d'objet
  admin: Admin[] = [];
  // tableau qui recupere notre localstorage
  tabAdmin:any ;

  ngOnInit() {
    if (!localStorage.getItem("admin") ) {
      localStorage.setItem("admin",JSON.stringify(this.admin));
    }
  
    this.tabAdmin=JSON.parse(localStorage.getItem("admin") || "[]");
    if(this.tabAdmin.length){
      this.idlastAdmin=this.tabAdmin[this.tabAdmin.length-1].idAdmin
    }
    console.log(this.tabAdmin[0].profs[0].role)
  }
  constructor(private route: Router) {
    
  }

  
  showForm() {
    this.formChoice = !this.formChoice;
  }


  // fonction du sweetalert
  verifChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    })
  }

  // Methode pour gerer l'inscription
  inscription() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if (this.nom == "" || this.prenom == "" || this.email == "" || this.password == "") {
      this.verifChamps("Desole", "Veuillez remplir tous les champs", "error");
    } else if (!this.email.match(emailPattern)) {
      this.verifChamps("desole", "l'email n'est pas valide", "error");
    } else if (this.password.length < 5) {
      this.verifChamps("desole", "Le mot de passe doit être supérieur ou égal à 5", "error");
    }
    else {
      let userAdmin = {
        idAdmin:this.idlastAdmin+1,
        nom : this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password,
        profs:[],
        apprenants:[],
        matiere:[]
      } 
      this.tabAdmin.push(userAdmin);
      console.log(this.tabAdmin);
      localStorage.setItem("admin", JSON.stringify(this.tabAdmin));
      this.verifChamps("Bravo", "Inscription reussi", "success");
      this.viderChamps();
      this.route.navigate(["auth"]);
    }
  }

  // methode pour vider les champs
  viderChamps() {
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.password = "";
  }

  // methode pour se connecter
  connexion(){
    console.log( this.tabAdmin[0].apprenants.find((element:any)=> element.email==this.email ))
    // this.userApprenantFound = this.tabAdmin[0].Apprenants.find((element:any)=> element.email==this.email )
    this.userProfFound = this.tabAdmin[0].profs.find((element:any)=> element.email==this.email )
    if(this.email==''|| this.password==''){
      this.verifChamps('Oups', 'Vous devez renseigner tous les champs', 'error');      
    }else if(this.email==='admin@admin.com' && this.password=== 'admin'){
        this.route.navigate(['dashboard' ]); 
    }else{
        if (this.userProfFound && this.userProfFound.etat=='active' && this.userProfFound.role=='professeur') {
          this.route.navigate(['evaluation']);
        }else if(this.tabAdmin[0].apprenants.find((element:any)=> element.email==this.email )){
          this.route.navigate(['listenoteapprenant']);

        }
        
        else{
          this.verifChamps('Oups', 'Ce compte n\'existe pas', 'error');
        }

       }

 }
}