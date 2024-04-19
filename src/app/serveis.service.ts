import { Injectable } from '@angular/core';
import {ProductesModel} from "./productesModel";
import {ProducteSeleccionat} from "./producte-seleccionat";
import {UsersService} from "./users.service";
//import {Product} from "./Productes";

@Injectable({
  providedIn: 'root'
})
export class ServeisService {

  objectes: ProductesModel[] = [];
  seleccionats: ProducteSeleccionat[] = [];

  constructor(private usersService: UsersService) {
  }

  addToCart(producte: ProductesModel){
    this.objectes.push(producte);
    this.addToItemSeleccionat(producte)
  }

  addToItemSeleccionat(producte: ProductesModel){
    this.seleccionats.push(new ProducteSeleccionat(producte, 1, "€", this.usersService.emailAutenticat));
  }

  getItems() {
    return this.seleccionats;
  }

  clearItems () {
    this.seleccionats = [];

    return this.seleccionats;
  }

  eliminarItem(index: any){
    this.seleccionats.splice(index, 1)
  }


}
