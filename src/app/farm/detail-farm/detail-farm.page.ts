import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Farm} from "../../model/farm";
import {ApiService} from "../../api.service";
import {AddFarmPage} from "../add-farm/add-farm.page";

@Component({
  selector: 'app-detail-farm',
  templateUrl: './detail-farm.page.html',
  styleUrls: ['./detail-farm.page.scss'],
})
export class DetailFarmPage implements OnInit {

  @Input() farm: Farm;
  deleting: boolean = false;
  constructor(private modalCtrl: ModalController,
              public apiService: ApiService) { }

  ngOnInit() {
    if (this.farm) {
      console.log('detail', this.farm);
    }
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
     if (result.data) {
       this.farm = result.data
     }
    });
  }

  getProfitValue(farm: Farm): number {
    // profit = icome - expense
    // let expense = cow?.vetCost + cow?.feed + cow?.inseminationCost;
    // let icome = cow?.milkPrice * cow?.milkProduction;
    return this.getIncome(farm) - this.getExpense(farm);
  }
  getExpense(farm: Farm): number {
    let expense: number;
      expense = farm.seedCost + farm.fertilizerCost1 + farm.fertilizerCost2 + farm.herbicideCost2 + farm.laborCost2 + farm.semiCost + farm.irrigationCost + farm.diverseCost
    return expense;
  }

  getIncome(farm: Farm): number {
    let icome: number;
    // if (farm.gender == 'Dame') {
      icome = farm.marketPriceCereals * farm.yield;
    // marketPriceCereals
    // } else {
    //   icome = cow.milkPrice * cow.milkProduction + cow.inseminationCost;
    // }
    return icome;
  }

  closeDetail() {
    this.modalCtrl.dismiss();
  }

  deleteItem() {
    this.deleting = true;
    this.apiService.deleteSeed(this.farm.id).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.deleting = false;
        this.modalCtrl.dismiss(2);
      } else {
        this.deleting = false;
      }
    }, error => {
      this.deleting = false;
    });
  }
}
