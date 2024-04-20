import {Component} from '@angular/core';
import {RegistreLoginService} from "../registre-login.service";
import {Router} from "@angular/router";
import {UsersService} from "../users.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  [x: string]: any;

  email: any;
  passwd: any;
  correuTrobat: any = false;

  constructor(private usersService: UsersService, public router: Router,
              private http: HttpClient, private registerLoginService: RegistreLoginService) {
  }

  async autenticar() {

    console.log("users from service | ", this.usersService.arrClients);
    var errorMessage = ' ';

    for (let i = 0; i < this.usersService.arrClients.length; i++) {

      if (this.usersService.arrClients[i].email == this.email
      && this.usersService.arrClients[i].password == this.passwd) {
        this.usersService.posAutenticat = i;
        this.correuTrobat = true;
        this.usersService.arrClients[i].admin == true ? this.usersService.admin = true : this.usersService.admin = false;
        this.usersService.autenticat = true;
        this.usersService.usuari = JSON.stringify(this.usersService.arrClients[i].nom);
        this.usersService.emailAutenticat = this.email;

        if (!this.correuTrobat) {
          alert("Sembla que no disposem de les dades d'aquest client!");
        }
        if (!this.usersService.autenticat) {
          alert("Entrada denegada!\n" + errorMessage);
        }

        this.http.post<any>('http://localhost:3080/log',
          {log: 'login', text: `Ha iniciat sessió un usuari amb l'adreça de correu ${this.email}`}).subscribe();

        this.router.navigate(['/'])
        break;
      }
    }
  }


}
