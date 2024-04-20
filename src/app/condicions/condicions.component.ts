import { Component } from '@angular/core';
import {RegistreLoginService} from "../registre-login.service";
import {HttpClient} from "@angular/common/http";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-condicions',
  templateUrl: './condicions.component.html',
  styleUrls: ['./condicions.component.css']
})
export class CondicionsComponent {
  autenticat = this.usersService.autenticat
  nomAutenticat = this.usersService.usuari
  admin = this.usersService.admin;

  constructor(private http: HttpClient, private usersService: UsersService,
              private router: Router) {
  }

  tancarSessio() {
    this.usersService.autenticat = false;
    this.usersService.usuari = '';
    this.usersService.emailAutenticat = "";
    this.autenticat = false;
    this.nomAutenticat = '';
    this.router.navigate(['/']);
  }
}
