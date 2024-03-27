import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Cow} from "../../model/cow";
import {ApiService} from "../../api.service";
import {AddCowPage} from "../add-cow/add-cow.page";

@Component({
  selector: 'app-detail-cow',
  templateUrl: './detail-cow.page.html',
  styleUrls: ['./detail-cow.page.scss'],
})
export class DetailCowPage implements OnInit {
@Input() cow: Cow;
  constructor(private modalCtrl: ModalController, public apiService: ApiService) { }

  ngOnInit() {
    if (this.cow) {
      console.log('detail', this.cow);
    }
  }

  async goToAdd(data: Cow) {
    const modal = await this.modalCtrl.create({
      component: AddCowPage,
      componentProps: {
        data: data
      }
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.cow = result.data
      }
    });
  }
  getProfitValue(cow: Cow): number {
    // profit = icome - expense
    // let expense = cow?.vetCost + cow?.feed + cow?.inseminationCost;
    // let icome = cow?.milkPrice * cow?.milkProduction;
    return this.getIncome(cow) - this.getExpense(cow);
  }
  getExpense(cow: Cow): number {
    let expense: number;
    if (cow.gender == 'Génisse') {
      expense = cow.vetCost + cow.feed + cow.inseminationCost
    } else {
      expense = cow.vetCost + cow.feed
    }

    return expense;
  }

  getIncome(cow: Cow): number {
    let icome: number;
    if (cow.gender == 'Génisse') {
      icome = cow.milkPrice * cow.milkProduction
    } else {
      icome = cow.inseminationCost;
      // icome = cow.milkPrice * cow.milkProduction + cow.inseminationCost;
    }
    return icome;
  }

  closeDetail() {
    this.modalCtrl.dismiss();
  }
}
