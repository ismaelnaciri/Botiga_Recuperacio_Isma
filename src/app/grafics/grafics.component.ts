import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import {Chart, LinearScale, registerables} from "chart.js";
import _default from "chart.js/dist/plugins/plugin.legend";
import labels = _default.defaults.labels;

Chart.register(...registerables);

@Component({
  selector: 'app-grafics',
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.css']
})
export class GraficsComponent implements OnInit {
  dailyRevenueData: any[] = [];
  ofertaNoOfertaData: any[] = [];
  autenticat= this.usuariServei.autenticat;
  admin= this.usuariServei.admin;
  nomAutenticat = this.usuariServei.usuari;

  constructor(private http: HttpClient,private usuariServei: UsersService,
              public router:Router) {

  }

  renderDailyRevenueChart() {
    this.dailyRevenueData.sort((a, b) => {
      const dateA = new Date(a.data);
      const dateB = new Date(b.data);
      return dateA.getTime() - dateB.getTime();
    });

    const revenuePerDay = this.dailyRevenueData.reduce((result, d) => {
      const date = new Date(d.data).toLocaleDateString("es-ES");
      const revenue = parseFloat(d.cost) * d.quantitat;// Extract date part only
      if (!result[date]) {
        result[date] = 0;
      }
      result[date] += revenue;
      return result;
    }, {});

    const dates = Object.keys(revenuePerDay);
    const revenues = Object.values(revenuePerDay);

    // Render chart
    const ctx = document.getElementById('grafic-ventes') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: 'Daily Revenue',
          data: revenues,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Euros'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Day'
            }
          }
        }
      }
    });
  }


  renderOfertaChart() {
    //Oferta line graph
    this.ofertaNoOfertaData.sort((a, b) => {
      const dateA = new Date(a.data);
      const dateB = new Date(b.data);
      return dateA.getTime() - dateB.getTime();
    });

    const revenuePerDayOferta1 = this.dailyRevenueData.reduce((result, d) => {
      if (d.oferta === 1) {
        const date = new Date(d.data).toLocaleDateString("es-ES"); // Extract date part only
        const revenue = parseFloat(d.cost) * d.quantitat; // Calculate revenue for this transaction
        if (!result[date]) {
          result[date] = 0;
        }
        result[date] += revenue; // Add revenue to total for this day
      }
      return result;
    }, {});

    const revenuePerDayOferta0 = this.dailyRevenueData.reduce((result, d) => {
      if (d.oferta === 0) {
        const date = new Date(d.data).toLocaleDateString("es-ES"); // Extract date part only
        const revenue = parseFloat(d.cost) * d.quantitat; // Calculate revenue for this transaction
        if (!result[date]) {
          result[date] = 0;
        }
        result[date] += revenue; // Add revenue to total for this day
      }
      return result;
    }, {});

    const dates = Object.keys(revenuePerDayOferta1); // Assuming dates are same for both datasets
    const revenuesOferta1 = dates.map(date => revenuePerDayOferta1[date] || 0);
    const revenuesOferta0 = dates.map(date => revenuePerDayOferta0[date] || 0);

    console.log("revenuesOferta | ", revenuePerDayOferta1);
    console.log("revenuesWithout | ", revenuesOferta0);
    const ctx = document.getElementById('grafic-oferta') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Revenue with Oferta',
          data: revenuesOferta1,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
          {
            label: 'Revenue without Oferta',
            data: revenuesOferta0,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Euros'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Day'
            }
          }
        }
      }
    });
  }

  tancarSessio() {
    this.usuariServei.autenticat = false;
    this.usuariServei.usuari = '';
    this.usuariServei.emailAutenticat = "";
    this.autenticat = false;
    this.nomAutenticat = '';
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3080/historialCompres').subscribe((data: any[]) => {
      this.dailyRevenueData = data;
      this.ofertaNoOfertaData = data;
      this.renderDailyRevenueChart();
      this.renderOfertaChart();
    });
  }
}
