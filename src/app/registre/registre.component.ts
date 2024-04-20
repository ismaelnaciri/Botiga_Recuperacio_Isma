import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UsersService} from "../users.service";


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
    this.captchaVerificat = true;
  }

  onExpired(response: any) {
    alert("La verificació ha caducat!")
  }

  onError(error: any) {
    alert("No 'ha pogut verificar correctament el captcha!")
  }

  async registrar() {
    for (let i = 0; i < this.userService.arrClients.length; i++) {
      if (this.userService.arrClients[i].email == this.correu) {
        this.correuTrobat = true;
      }
    }
    if (this.correuTrobat)  {
      alert("Ja existeix un usuari registrat amb aquest correu!")
    } else {
      this.http.post<any>('http://localhost:3080/register', {
        user: {
          email: this.correu,
          password: this.passwd,
          nom: this.nom,
          admin: (this.userService.arrClients.length % 2 == 0)
        }
      }).subscribe(
        response => {
          if (response) {
            console.log("Response from server: ", response);
          }
        }
      );
      this.http.post<any>('http://localhost:3080/log',{
        log: 'registre',
        text: `${this.nom} s'ha registrat amb l'adreça de correu ${this.correu}`
      }).subscribe();
      await this.router.navigate(['/login']);
    }
  }

  constructor(public router:Router, private userService: UsersService, private http: HttpClient) {
  }

  async goToAdminRegistre() {
    await this.router.navigate(["/adminregistre"]);
  }

  ngOnInit(){}

}
