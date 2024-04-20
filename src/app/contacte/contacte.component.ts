import { Component } from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";
import {RegistreLoginService} from "../registre-login.service";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contacte',
  templateUrl: './contacte.component.html',
  styleUrls: ['./contacte.component.css']
})
export class ContacteComponent {
  name: any;
  mail: any;
  missatge: any;

  autenticat = this.usersService.autenticat
  nomAutenticat = this.usersService.usuari
  admin = this.usersService.admin;

  constructor(private http: HttpClient, private registraServei: RegistreLoginService,
              private usersService: UsersService, private router: Router) {
  }

  tancarSessio() {
    this.usersService.autenticat = false;
    this.usersService.usuari = '';
    this.usersService.emailAutenticat = "";
    this.autenticat = false;
    this.nomAutenticat = '';
    this.router.navigate(['/']);
  }

  escriure() {
    console.log("XD");
    this.http.post<any>("http://localhost:3080/api/escriure", {name: this.name, mail: this.mail, missatge: this.missatge});
  }
}
