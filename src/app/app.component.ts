import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import {Farm} from "./model/farm";
import {Cow} from "./model/cow";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.saveFirstSeed();
    this.saveFirstCow();
  }

  saveFirstSeed() {
    Preferences.get({key: 'seed'}).then((res) => {
      if (!res.value) {
        let seeds: Farm[] = [];
        seeds.push(
          // {
          //   id: 1,
          //   area: 109,
          //   crop: "s",
          //   seedCost: 103,
          //   fertilizerCost1: 0,
          //   fertilizerCost2: 0,
          //   herbicideCost2: 0,
          //   laborCost2: 0,
          //   yield: 0,
          //   salePrice: 0,
          //   expense: 0,
          //   grosseIncome: 0,
          //   profit: 0,
          // }
        );
        Preferences.set({
          key: 'seed',
          value: JSON.stringify(seeds)
        }).then();
      }
    });
  }
  saveFirstCow() {
    Preferences.get({key: 'cow'}).then((res) => {
      if (!res.value) {
        let seeds: Cow[] = [];
        seeds.push(
          {
            id: 1,
            gender: 'Dame',
            inseminationCost: 300,
            inseminationDate: new Date(),
            calvingDate: new Date(),
            milkProduction: 1,
            feed: 1,
            vetCost: 3,
            milkPrice: 3,
            expense: 3,
            income: 3,
            profit: 3,
          }
        );
        Preferences.set({
          key: 'cow',
          value: JSON.stringify(seeds)
        }).then();
      }
    });
  }
}
