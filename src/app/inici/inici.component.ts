import {Component} from '@angular/core';
import {RegistreLoginService} from "../registre-login.service";
import {UsersService} from "../users.service";


@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css']
})
export class IniciComponent {
  autenticat = this.usersService.autenticat;
  nomAutenticat = this.usersService.usuari;
  admin = this.usersService.admin;

  constructor(private registraServei: RegistreLoginService, private usersService: UsersService) {
  }

  tancarSessio(){
    this.usersService.autenticat = false;
    this.usersService.usuari = '';
    this.autenticat= false;
    this.nomAutenticat = 'null';
    console.log("funciona clic")
  }

}
