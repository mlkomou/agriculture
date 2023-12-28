import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

import {Chart} from "angular-highcharts";
import * as Highcharts from 'highcharts';

import More from 'highcharts/highcharts-more';

More(Highcharts);
import Drilldown from 'highcharts/modules/drilldown';

Drilldown(Highcharts);
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
   genderChart: Chart;
   icomeChart: Chart;
   milkprodChart: Chart;
   cropChart: Chart;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.showGendreChart();
    this.showMilProdChart();
    this.showRendementPerCrop();
    this.incomeChart();
  }

  showGendreChart() {
    let opts: any = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Gender Cow Number'
      },
      tooltip: {
        valueSuffix: '%'
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
          data: [
            {
              name: 'Sir',
              y: 55.02
            },
            {
              name: 'Dame',
              sliced: true,
              selected: true,
              y: 26.71
            }
          ]
        }
      ]
    };
    this.genderChart = new Chart(
      opts
    );
  }

  incomeChart() {
    let opts: any = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Percentage Icome by Seed'
      },
      tooltip: {
        valueSuffix: '%'
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


    //         ['Corn', 3700],
    //       ['Peanut', 3100],
    // ['Bean', 2700],
    //   ['Rice', 2200],
        }
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: [
            {
              name: 'Corn',
              y: 55.02
            },
            {
              name: 'Peanut',
              sliced: true,
              selected: true,
              y: 26.71
            },
            {
              name: 'Bean',
              sliced: true,
              selected: true,
              y: 30
            },
            {
              name: 'Rice',
              sliced: true,
              selected: true,
              y: 62
            },
          ]
        }
      ]
    };
    this.icomeChart = new Chart(
      opts
    );
  }
  showMilProdChart() {
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        name: 'Cow',
        marker: {
          symbol: 'square'
        },
        data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
          y: 26.4,
          // marker: {
          //   symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
          // },
          accessibility: {
            description: 'Sunny symbol, this is the warmest point in the chart.'
          }
        }, 22.8, 17.5, 12.1, 7.6]

      }, {
        name: 'Seed',
        marker: {
          symbol: 'diamond'
        },
        data: [{
          y: 1.5,
          // marker: {
          //   symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
          // },
          accessibility: {
            description: 'Snowy symbol, this is the coldest point in the chart.'
          }
        }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
      }]
    };
    this.milkprodChart = new Chart(
      opts
    );
  }

  showRendementPerCrop() {
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
        data: [
          ['Corn', 3700],
          ['Peanut', 3100],
          ['Bean', 2700],
          ['Rice', 2200],
        ],
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
    this.cropChart = new Chart(
      opts
    );
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
