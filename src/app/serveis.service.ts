import { Injectable } from '@angular/core';
//import {Product} from "./Productes";

@Injectable({
  providedIn: 'root'
})
export class ServeisService {

  objectes: any[] = [];

  constructor() {
  }

  addToCart(producte: any){
    this.objectes.push(producte);
  }

  getItems() {
    return this.objectes;
  }

  clearItems () {
    this.objectes = [];

    return this.objectes;
  }

  eliminarItem(index: any){
    this.objectes.splice(index, 1)
  }
  posarDadesCistella(data: any){
    localStorage.setItem('cart', JSON.stringify(data))
  }
}
