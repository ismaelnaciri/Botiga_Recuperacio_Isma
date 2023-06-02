import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import {Chart} from "chart.js";

interface Datos {
  data_compra: string;
  id_producta_comprat: number;
  quantitat: number;
  oferta: boolean;
}

@Component({
  selector: 'app-grafics',
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.css']
})
export class GraficsComponent {
  dades: any[] = [];
  autenticat= this.usuariServei.autenticat;

  constructor(private http: HttpClient,private usuariServei: UsersService,
              public router:Router) {
    if(this.autenticat){
      this.nomAutenticat = this.usuariServei.arrClients.clients[this.usuariServei.posAutenticat].Nom;
      if(this.usuariServei.arrClients.clients[this.usuariServei.posAutenticat].Rol == 'root'){
        this.root = true;
      }
      else{
        this.root=false
        this.router.navigate(['/']);
      };
    }else{
      this.router.navigate(['/']);
    }
    this.http.get<Datos[]>('http://localhost:3080/dadescompres').subscribe((data: Datos[]) => {
      this.dades = data;
      this.renderChart();
    });
  }

  renderChart() {

    const groupedData = this.dades.reduce((result, d) => {
      const key = `${d.data_compra}-${d.id_producta_comprat}`;
      if (!result[key]) {
        result[key] = {
          label: d.id_producta_comprat,
          data: 0,
          backgroundColor: this.getRandomColor(),
        };
      }
      result[key].data += d.quantitat;
      return result;
    }, {});

// Crear conjunt de dades per crear cada grup de dades
    const datasets = Object.keys(groupedData).map(key => ({
      label: groupedData[key].label,
      data: [groupedData[key].data],
      backgroundColor: groupedData[key].backgroundColor,
    }));

// Configurar el grafic de barras
    new Chart('grafic-ventes', {
      type: 'bar',
      data: {
        labels: this.getUniqueDates(),
        datasets: datasets,
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 10,
            },
            stacked: false,
          },
          x: {
            stacked: false,
          },
        },
      },
    });

    const datasetsO = this.dades.reduce((groups, data) => {
      if (!groups[data.oferta]) {
        groups[data.oferta] = {
          label: data.oferta ? 'Productos en oferta' : 'Productos sin oferta',
          data: [],
          borderColor: this.getRandomColor(),
          fill: false,
        };
      }

      const index = this.getUniqueDates().indexOf(data.data_compra);
      groups[data.oferta].data[index] = data.quantitat;
      return groups;

    }, );

    new Chart('grafic-oferta', {
      type: 'line',
      data: {
        labels: this.getUniqueDates(),
        datasets: datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 10,
            },
          },
        },
      },
    });
  }

//
  private getUniqueDates(): string[] {
    return [...new Set(this.dades.map(d => d.data_compra))];
  }

//
  nomAutenticat: any;
  root: any;
  private getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  tancarSessio() {
    this.usuariServei.autenticat = false;
    this.autenticat= false;
    this.nomAutenticat= 'null';
    this.root = false;
    this.router.navigate(['/']);
  }
}
