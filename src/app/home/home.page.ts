import { Component } from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {CowPage} from "../cow/cow.page";
import {FarmPage} from "../farm/farm.page";
import {DashboardPage} from "../dashboard/dashboard.page";
import {LearningPage} from "../learning/learning.page";
import {Preferences} from "@capacitor/preferences";
import {Farm} from "../model/farm";
import {AddFarmPage} from "../farm/add-farm/add-farm.page";
import {Cow} from "../model/cow";
import {Chart} from "angular-highcharts";
import * as Highcharts from 'highcharts';

import More from 'highcharts/highcharts-more';

More(Highcharts);
import Drilldown from 'highcharts/modules/drilldown';

Drilldown(Highcharts);
import Exporting from 'highcharts/modules/exporting';
import {DetailCowPage} from "../cow/detail-cow/detail-cow.page";
import {Farmer} from "../model/farmer";
import {Router} from "@angular/router";
import {EcommercePage} from "../ecommerce/ecommerce.page";

Exporting(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
currentTab: any = 'seed';
  seeds: Farm[] = [];
  cows: Cow[] = [];
  currentUser: Farmer = JSON.parse(localStorage.getItem('user'));

  //// statistics
  genderChart: Chart;
  milkprodChart: Chart;

  languages: any[] = [
    {
      ln: 'Français',
      img: 'assets/img/flag/france.png'
    },
    {
      ln: 'Anglais',
      img: 'assets/img/flag/us.png'
    },
  ];

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private router: Router) {
    this.getfarmsprod();
    this.getCows();
    this.showGendreChart();
    this.showMilProdChart();


    // if (this.currentUser) {
    //   console.log('currentUser', this.currentUser);
    // }
  }

  async signout() {
    const alert = await this.alertCtrl.create({
      header: "Déconnexion",
      message: "Voulez-vous être déconnecté ?",
      buttons: [
        {
          text: "Non"
        }, {
        text: "Oui",
          handler: () => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            this.router.navigate(['login']);
          }
        }
      ]
    });
    await alert.present();
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
          marker: {
            symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
          },
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
          marker: {
            symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
          },
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

  async openPage(page: any, id: any) {
    const modal = await this.modalCtrl.create({
      component: page,
      id: id
    });
    await modal.present();
  }

  getfarmsprod() {
    Preferences.get({key: 'seed'}).then((result) => {
      if (result.value) {
        this.seeds = JSON.parse(result.value);
      }
    });
  }

  async goToAdd(data: Farm) {
    const modal = await this.modalCtrl.create({
      component: AddFarmPage,
      componentProps: {
        data: data
      }
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      if (result.data == 1) {
        this.getfarmsprod();
      }
    });
  }

  getCows() {
    Preferences.get({key: 'cow'}).then((result) => {
      if (result.value) {
        this.cows = JSON.parse(result.value);
        console.log(this.cows);

      }
    });
  }



  goToCow() {
    this.openPage(CowPage, 'cow');
  }
  goToFarm() {
    this.openPage(FarmPage, 'farm');
  }
  goToDash() {
    this.openPage(DashboardPage, 'dash');
  }

  goToLearning() {
    this.openPage(LearningPage, 'learning');
  }

  goToMarket() {
    this.openPage(EcommercePage, 'market');
  }

}
