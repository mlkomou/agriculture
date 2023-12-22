import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Cow} from "../../model/cow";

@Component({
  selector: 'app-detail-cow',
  templateUrl: './detail-cow.page.html',
  styleUrls: ['./detail-cow.page.scss'],
})
export class DetailCowPage implements OnInit {
@Input() cow: Cow;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.cow) {
      console.log('detail', this.cow);
    }
  }

  getProfitValue(cow: Cow): number {
    // profit = icome - expense
    // let expense = cow?.vetCost + cow?.feed + cow?.inseminationCost;
    // let icome = cow?.milkPrice * cow?.milkProduction;
    return this.getIncome(cow) - this.getExpense(cow);
  }
  getExpense(cow: Cow): number {
    let expense: number;
    if (cow.gender == 'Dame') {
      expense = cow.vetCost + cow.feed + cow.inseminationCost
    } else {
      expense = cow.vetCost + cow.feed
    }

    return expense;
  }

  getIncome(cow: Cow): number {
    let icome: number;
    if (cow.gender == 'Dame') {
      icome = cow.milkPrice * cow.milkProduction
    } else {
      icome = cow.milkPrice * cow.milkProduction + cow.inseminationCost;
    }
    return icome;
  }

  closeDetail() {
    this.modalCtrl.dismiss();
  }
}
