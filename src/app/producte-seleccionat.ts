import {ProductesModel} from "./productesModel";

export class ProducteSeleccionat {
  producte: ProductesModel;
  quantity: number;
  coin: any;
  usuari: string;

  constructor(producte: ProductesModel, quantity: number, coin: any, usuari: string) {
    this.producte = producte;
    this.quantity = quantity;
    this.coin = coin;
    this.usuari = usuari
  }
}
