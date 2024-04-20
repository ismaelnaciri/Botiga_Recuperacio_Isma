import {Component, OnInit} from '@angular/core';
import {ServeisService} from "../serveis.service";
import {HttpClient} from "@angular/common/http";
import {RegistreLoginService} from "../registre-login.service";
import {UsersService} from "../users.service";
import {ProductesModel} from "../productesModel";
import {Router} from "@angular/router";

//import { Product, products } from "../Productes";

@Component({
  selector: 'app-cataleg',
  templateUrl: './cataleg.component.html',
  styleUrls: ['./cataleg.component.css']
})
export class CatalegComponent implements OnInit {
  products: ProductesModel[] = [];
  temp: any;
  autenticat = this.usersService.autenticat;
  nomAutenticat = this.usersService.usuari;
  admin = this.usersService.admin;

  constructor(private s: ServeisService, private http: HttpClient,
              private registreServei: RegistreLoginService, private usersService: UsersService,
              private router: Router) {
    this.listProductes();
  }

  tancarSessio(){
    this.usersService.autenticat = false;
    this.usersService.usuari = '';
    this.usersService.emailAutenticat = "";
    this.autenticat= false;
    this.nomAutenticat= '';
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

  listProductes() {
    this.http.get('http://localhost:3080/productes')
      .subscribe(data => {
        this.temp = data;

        for (let i = 0; i < this.temp.length; i++) {
          this.products.push(new ProductesModel(
            this.temp[i].idproducte,
            this.temp[i].nom,
            this.temp[i].preu,
            this.temp[i].img,
            this.temp[i].tipus,
            this.temp[i].oferta,
            this.temp[i].createdAt,
            this.temp[i].updatedAt,
          ));
        }
        console.log("products: | ", this.products);
      });
  }

  addToCart(product: ProductesModel){
    if (this.autenticat) {
      this.s.addToCart(product);
      window.alert((`${product.nom} s'ha afegit a la cistella.`));
    } else {
      window.alert((`Has d'iniciar sessió per poder poder afegir elements a la cistella`));
    }
  }

  filterShown (product: ProductesModel) {
    let filtratgeJoc = product.tipus = "Joc";
    let filtratgeConsola = product.tipus = "Consola";
    let filtratgeMando = product.tipus = "Mando";
  }


}
