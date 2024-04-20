import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import {ProductesModel} from "../productesModel";

@Component({
  selector: 'app-crear-producte',
  templateUrl: './crear-producte.component.html',
  styleUrls: ['./crear-producte.component.css']
})
export class CrearProducteComponent implements OnInit{

  autenticat= this.usuariServei.autenticat;
  admin= this.usuariServei.admin;
  nomAutenticat = this.usuariServei.usuari;

  producteNom: string = "";
  productePreu: number = 0.0;
  producteTipus: string = "";
  producteOferta: number = 0;

  constructor(private http: HttpClient, private usuariServei: UsersService, public router:Router) {
    if (!this.autenticat && !this.autenticat) {
      this.router.navigate(['/']);
    }
  }

  tancarSessio() {
    this.usuariServei.autenticat = false;
    this.usuariServei.admin = false;
    this.usuariServei.usuari = "";
    this.autenticat = false;
    this.nomAutenticat = '';
    this.router.navigate(['/']);
  }

  crearProducte() {

    if (this.producteNom != ""
      && this.productePreu != 0.0
      && this.producteTipus != "")
    {
      let date = new Date();
      const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      let producteCreat = new ProductesModel(
        0,
        this.producteNom,
        this.productePreu,
        "",
        this.producteTipus,
        this.producteOferta,
        formattedDate,
        formattedDate
      )

      console.log("producteCreat: " + JSON.stringify(producteCreat));
      this.http.post("http://localhost:3080/crearProducte", {producte: producteCreat}).subscribe(
        response => {
          if (response) {
            console.log(response)
          }
        },
      )
    }
  }

  ngOnInit(): void {
    let checkbox = <HTMLInputElement> document.getElementById("producteOferta");
    checkbox.addEventListener( "change", () => {
      if ( checkbox.checked ) {
        this.producteOferta = 1;
      } else {
        this.producteOferta = 0;
      }
    });
  }

}
