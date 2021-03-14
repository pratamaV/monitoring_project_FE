import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const productCanvas = document.getElementById('productChart');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 14;
    const productData = {
      labels: [
        'Asuransi Kecelakaan Diri',
        'Asuransi Perjalanan',
        'Asuransi Properti/ Harta Benda'
      ],
      datasets: [
        {
          data: [12, 3, 4],
          backgroundColor: [
            '#f9e0ae',
            '#fc8621',
            '#682c0e'
          ]
        }]
    };

    const pieChart = new Chart(productCanvas, {
      type: 'pie',
      data: productData
    });
  }

}
