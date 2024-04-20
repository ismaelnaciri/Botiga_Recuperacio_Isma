import { Component } from '@angular/core';
import {RegistreLoginService} from "../registre-login.service";
import {Router} from "@angular/router";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private registraServei: RegistreLoginService, private router: Router,
              private usersService: UsersService) {

    if (!this.usersService.autenticat) {
      this.router.navigate(['/login']);
    }
  }

  autenticat = this.usersService.autenticat
  admin = this.usersService.admin;
  nomAutenticat = this.usersService.usuari
  emailAutenticat = this.usersService.emailAutenticat

  tancarSessio() {
    this.usersService.autenticat = false;
    this.usersService.usuari = '';
    this.usersService.emailAutenticat = "";
    this.autenticat = false;
    this.nomAutenticat = '';
    this.router.navigate(['/']);
  }
}
