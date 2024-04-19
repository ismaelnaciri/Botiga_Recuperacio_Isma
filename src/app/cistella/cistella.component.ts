import {Component, OnInit} from '@angular/core';
import {ServeisService} from "../serveis.service";
import {HttpClient} from "@angular/common/http";
import {UsersService} from "../users.service";
import {RegistreLoginService} from "../registre-login.service";
import {ProducteSeleccionat} from "../producte-seleccionat";

@Component({
  selector: 'app-cistella',
  templateUrl: './cistella.component.html',
  styleUrls: ['./cistella.component.css']
})
export class CistellaComponent implements OnInit {
  items: ProducteSeleccionat[] = this.s.seleccionats
  preuVariable = 0;
  monedaSimbol = "€";
  canviMoneda = this.calcularTotal();
  preuActual: any;

  autenticat = this.usersService.autenticat
  nomAutenticat = this.usersService.usuari
  admin = this.usersService.admin

  constructor(private s: ServeisService,
              private http: HttpClient,
              private serv: UsersService,
              private registraServei: RegistreLoginService,
              private usersService: UsersService) {

    console.log(`items received in cistella | ${this.items}`)

  }

  tancarSessio() {
    this.registraServei.autenticat = false;
    this.registraServei.nomAutenticat = 'null';
    this.autenticat = false;
    this.nomAutenticat = 'null';
    console.log("funciona clic")
  }

  ngOnInit() {
    const selectElement = document.getElementById("cryptosID") as HTMLSelectElement;
    selectElement.addEventListener("change", this.preuCryptos.bind(this));
  }

  async preuCryptos() {
    // @ts-ignore
    const selectedValue = (event.target as HTMLSelectElement).value;
    const test = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,binancecoin,ethereum,dollars&vs_currencies=eur");
    const conversio = await test.json();
    //@ts-ignore
    this.canviMoneda = this.preuVariable;
    if (selectedValue === "BNB") {
      this.canviMoneda = this.preuVariable / conversio.binancecoin.eur;
      this.monedaSimbol = "BNB";
      this.preuActual = conversio.binancecoin.eur;
      this.items.forEach(item => {
        item.coin = "BNB"
      });
    }
    //@ts-ignore
    else if (selectedValue === "BTC") {
      this.canviMoneda = this.preuVariable / conversio.bitcoin.eur;
      this.monedaSimbol = "BTC";
      this.preuActual = conversio.bitcoin.eur;
      this.items.forEach(item => {
        item.coin = "BTC"
      });
    }
    //@ts-ignore
    else if (selectedValue === "ETH") {
      this.canviMoneda = this.preuVariable / conversio.ethereum.eur;
      this.monedaSimbol = "ETH";
      this.preuActual = conversio.ethereum.eur;
      this.items.forEach(item => {
        item.coin = "ETH"
      });
    } else if (selectedValue === "EUROS") {
      this.canviMoneda = this.calcularTotal();
      this.monedaSimbol = "€";
      this.preuActual = 1;

      this.items.forEach(item => {
        item.coin = "€"
      });
    } else if (selectedValue === "DOLARS") {
      this.canviMoneda = this.preuVariable / conversio.dollars.eur;
      this.monedaSimbol = "$";
      this.preuActual = conversio.dollars.eur;
      this.items.forEach(item => {
        item.coin = "$"
      });
    } else if (selectedValue === "default") {
      this.canviMoneda = 0;
      this.monedaSimbol = " ";
    }
  }

  async compraBNB() {
    const test = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,binancecoin,ethereum,dollars&vs_currencies=eur,usd,btc");
    const conversio = await test.json();
    this.canviMoneda = this.preuVariable / conversio.binancecoin.eur;
    console.log(this.canviMoneda + "BNB")
  }

  premerEnviar(): void {
    this.items = this.s.clearItems();
  }

  esborrar(index: number) {
    this.s.eliminarItem(index);
  }

  ValidateInput(event: any, i: number) {
    const quantity = +event.target.value;
    if (quantity < 1) {
      event.target.value = this.items[i].quantity;
      return;
    }
    this.QuantityUpdated(quantity, i)
    this.canviMoneda = this.calcularTotal();
  }

  private QuantityUpdated(quantity: number, i: number) {
    this.items[i].quantity = quantity;
  }

  public CoinUpdate(coin: string) {
    for (let i = 0; i < this.items.length; i++)
      this.items[i].coin = coin;
  }

  public PriceUpdate(price: number) {
    for (let i = 0; i < this.items.length; i++) {
      // @ts-ignore
      this.items[i].producte.preu = price;
    }
  }


  public calcularTotal(): number {
    let total: number = 0;
    for (let item of this.items) {
      total += (item.quantity * item.producte.preu)
      this.preuVariable = total;

    }
    return total;
  }

  public clearAll() {
    for (let i = 0; i < this.items.length; i++) {
      this.esborrar(i);
      this.canviMoneda = 0;
      this.monedaSimbol = '€';
    }
  }

  async compraProducte() {
    // this.CoinUpdate(this.monedaSimbol);
    // await this.compraBNB()
    // this.PriceUpdate(this.canviMoneda)

    console.log("received items? ", this.items);


    this.http.post('http://localhost:3080/compres', {productes: this.items})
      .subscribe({
        error: error => {
          console.error("There was an error", error);
        }, complete: () => {
          this.clearAll()
          this.calcularTotal()
        }
      });

    // let params = [
    //   {
    //     // from: this.serv.walletName,
    //     from: "0xEe6e5A87F17b6f587497d158e86Ee810E24a47F6",
    //     to: "0x14c083cFbC76533D684A75D6eA4ba9933213e45a",
    //     value: Number(this.canviMoneda).toString(16),
    //     data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
    //   },
    // ]
    // //@ts-ignore
    // await window.ethereum.request({method: "eth_sendTransaction"}, params);

  }

}
