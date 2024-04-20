export class ProductesModel {
  idproducte: number;
  nom: string;
  preu: number;
  img: string;
  tipus: string;
  oferta: number;
  createdAt: string;
  updatedAt: string;


  constructor(idproducte: number, nom: string, preu: number, img: string, tipus: string, oferta: number, createdAt: string, updatedAt: string) {
    this.idproducte = idproducte;
    this.nom = nom;
    this.preu = preu;
    this.img = img;
    this.tipus = tipus;
    this.oferta = oferta;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
