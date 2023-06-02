import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UsersService} from "../users.service";

import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Interface} from "ethers";
import {RegistreLoginService} from "../registre-login.service";


declare global {
  interface Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-registre-andlogin',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent  {
  autenticat= this.userService.autenticat;
  nomAutenticat: any;
  correu: any;
  passwd: any;
  nom: any;
  cognoms: any;
  adreca: any;
  telefon: any;
  correuTrobat: any;
  captchaVerificat = false;

  tancarSessio(){
    window.location.reload();
    this.userService.autenticat = false;
    this.autenticat = false;
    this.nomAutenticat= 'null';
  }

  onVerify(token: string) {
    this.captchaVerificat=true;
  }

  onExpired(response: any) {
    alert("La verificació ha caducat!")
  }

  onError(error: any) {
    alert("No 'ha pogut verificar correctament el captcha!")
  }

  async registrar() {
    for (let i = 0; i < this.userService.arrClients.clients.length; i++) {
      if (this.userService.arrClients.clients[i].Correu == this.correu) {
        this.correuTrobat = true;
      }
    }
    if (this.correuTrobat)  {
      alert("Ja existeix un usuari registrat amb aquest correu!")
    } else {
      this.http.post<any>('http://localhost:3080/datausers', {
        Adreça: this.adreca,
        Cognoms: this.cognoms,
        Correu: this.correu,
        Nom: this.nom,
        Telèfon: this.telefon,
        //Afegim un camp que es rol que per defecte es client.
        Rol: 'client'
      }).subscribe();
      this.http.post<any>('http://localhost:3080/signup', {
        email: this.correu,
        password: this.passwd
      }).subscribe();
      this.http.post<any>('http://localhost:3080/log',{
        log: 'registre',
        text: `${this.nom} s'ha registrat amb l'adreça de correu ${this.correu}`
      }).subscribe();
      window.alert("S'ha enviat un correu de verificació.")
      await this.router.navigate(['/login']);
    }
  }

  constructor(private registraServei: RegistreLoginService,public router:Router,
              private userService: UsersService, private http: HttpClient) {
  }

  async goToAdminRegistre() {
    await this.router.navigate(["/adminregistre"]);
  }

  ngOnInit(){}

}
