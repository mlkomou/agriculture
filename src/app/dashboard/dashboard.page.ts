import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

import {Chart} from "angular-highcharts";
import * as Highcharts from 'highcharts';

import More from 'highcharts/highcharts-more';

More(Highcharts);
import Drilldown from 'highcharts/modules/drilldown';

Drilldown(Highcharts);
import Exporting from 'highcharts/modules/exporting';
import {ApiService} from "../api.service";
import {Farmer} from "../model/farmer";

Exporting(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
   genderChart: Chart;
   icomeChart: Chart;
   expenseChart: Chart;
   yieldChart: Chart;
   seedByCropChart: Chart;

   currentUser: Farmer = JSON.parse(localStorage.getItem("user"));
  constructor(private modalCtrl: ModalController, private apiService: ApiService) { }

  ngOnInit() {




    this.getCowByGender();

    this.getByCrop();
    this.getIcomeCrop();
    this.getExpenses();
    this.getYieldByCrop();
  }

  getCowByGender() {
    if (this.currentUser) {
      this.apiService.cowByGender(this.currentUser.id).subscribe((res) => {
        // console.log(res);
        if (res.ok) {
          this.showGendreChart(res.data);
        }
      });
    }
  }

  getByCrop() {
    if (this.currentUser) {
      this.apiService.getByCrop(this.currentUser.id).subscribe((res) => {
        // console.log("seeds", res.data);
        if (res.ok) {
          this.getSeedByCropChart(res.data);
        }
      });
    }
  }

  getIcomeCrop() {
    this.apiService.getIcomeByCrop(this.currentUser.id).subscribe((res) => {
      // console.log('income', res);
      if (res.ok) {
        this.seedIcomeByCropChart(res.data);
      }
    })
  }

  getExpenses() {
    this.apiService.getExpenses(this.currentUser.id).subscribe((res) => {
      console.log('expense', res);
      if (res.ok) {
        this.showExpenseChart(res.data);
      }
    });
  }

  showGendreChart(data: any[]) {
    let opts: any = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Gender Cow Number'
      },
      tooltip: {
        valueSuffix: ''
      },
      subtitle: {
        text:
          ''
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      series: [
        {
          name: 'Nombre',
          colorByPoint: true,
          data: data
        }
      ]
    };
    this.genderChart = new Chart(
      opts
    );
  }

  getSeedByCropChart(data: any[]) {
    let opts: any = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Percentage of Seed by crop'
      },
      tooltip: {
        valueSuffix: ''
      },
      subtitle: {
        text:
          ''
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: data

        }
      ]
    };
    this.seedByCropChart = new Chart(
      opts
    );
  }
  seedIcomeByCropChart(data: any[]) {
    let opts: any = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Percentage of Icome by crop'
      },
      tooltip: {
        valueSuffix: ''
      },
      subtitle: {
        text:
          ''
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: data
        }
      ]
    };
    this.icomeChart = new Chart(
      opts
    );
  }
  showExpenseChart(data: any) {
    let opts: any = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Monthly Expense'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: data.categories,
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        accessibility: {
          description: 'Months of the year'
        }
      },
      yAxis: {
        title: {
          text: 'Expense'
        },
        labels: {
          format: '{value}'
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: 'Seed',
        marker: {
          symbol: 'square'
        },
        data: data.data
        // data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, 26.4, 22.8, 17.5, 12.1, 7.6]

      }, {
        name: 'Cow',
        marker: {
          symbol: 'diamond'
        },
        data: data.dataCow
      }]
    };
    this.expenseChart = new Chart(
      opts
    );
  }

  getYieldByCrop() {
    this.apiService.getYieldByCrop(this.currentUser.id).subscribe((res) => {
      console.log('yield', res);
      if (res.ok) {
        this.showRendementPerCrop(res.data);
      }
    });
  }

  showRendementPerCrop(data: any[]) {
    let opts: any = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Yield by Seed'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        type: 'category',
        labels: {
          autoRotation: [-45, -90],
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Dollar'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Yield: <b>{point.y}</b>'
      },
      series: [{
        name: 'Seed',
        colors: [
          '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
          '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
          '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
          '#03c69b',  '#00f194'
        ],
        colorByPoint: true,
        groupPadding: 0,
        data: data,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    };
    this.yieldChart = new Chart(
      opts
    );
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
