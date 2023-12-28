import {Component, Input, OnInit} from '@angular/core';
import {Cow} from "../../model/cow";
import {ModalController} from "@ionic/angular";
import {Farm} from "../../model/farm";

@Component({
  selector: 'app-detail-farm',
  templateUrl: './detail-farm.page.html',
  styleUrls: ['./detail-farm.page.scss'],
})
export class DetailFarmPage implements OnInit {

  @Input() farm: Farm;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.farm) {
      console.log('detail', this.farm);
    }
  }

  getProfitValue(farm: Farm): number {
    // profit = icome - expense
    // let expense = cow?.vetCost + cow?.feed + cow?.inseminationCost;
    // let icome = cow?.milkPrice * cow?.milkProduction;
    return this.getIncome(farm) - this.getExpense(farm);
  }
  getExpense(farm: Farm): number {
    let expense: number;
      expense = farm.seedCost + farm.fertilizerCost1 + farm.fertilizerCost2 + farm.herbicideCost2 + farm.laborCost2
    return expense;
  }

  getIncome(farm: Farm): number {
    let icome: number;
    // if (farm.gender == 'Dame') {
      icome = farm.salePrice * farm.yield;
    // } else {
    //   icome = cow.milkPrice * cow.milkProduction + cow.inseminationCost;
    // }
    return icome;
  }

  closeDetail() {
    this.modalCtrl.dismiss();
  }
}
