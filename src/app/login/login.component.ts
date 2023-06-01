import { Component } from '@angular/core';
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
  correuTrobat: any;

  async autenticar() {
    var errorMessage = ' ';

    await this.firebaseAuth.signInWithEmailAndPassword(this.email, this.passwd).then(res => {
        this.usersService.autenticat = true;
        this.usersService.usuari = JSON.stringify(res.user);
        this.usersService.emailAutenticat = this.email;
        this.correuTrobat = false;

        for (let i = 0; i < this.usersService.arrClients.clients.length; i++) {
          if (this.usersService.arrClients.clients[i].Correu == this.email) {
            this.usersService.posAutenticat = i;
            this.correuTrobat = true;
            this.http.post<any>('http://localhost:3080/log',
              {log: 'login', text: `Ha iniciat sessió un usuari amb l'adreça de correu ${this.email}`}).subscribe();

            this.router.navigate(['/'])
          }
        }
        if (!this.correuTrobat) {
          alert("Sembla que no disposem de les dades d'aquest client!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        errorMessage= error.message;
      })
    if (!this.usersService.autenticat) {
      alert("Entrada denegada!\n" + errorMessage);
    }
  }


  constructor(private usersService: UsersService, public router: Router,
              public firebaseAuth: AngularFireAuth, private http: HttpClient) {
  }

}
