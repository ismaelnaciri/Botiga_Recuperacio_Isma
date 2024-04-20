import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-canviarpassword',
  templateUrl: './canviarpassword.component.html',
  styleUrls: ['./canviarpassword.component.css']
})
export class CanviarpasswordComponent {
  email: any;
  async restaurarContrasenya(){
    alert("S'ha enviat un correu per a restablir la contraseya a l'acreça indicada")
    await this.router.navigate(['/login'])
  }
  constructor(public router:Router, private usuariServei: UsersService) {}

}
