import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ApiService} from "../api.service";
import {Farm} from "../model/farm";
import {AddFarmPage} from "./add-farm/add-farm.page";
import {Preferences} from "@capacitor/preferences";
import {Cow} from "../model/cow";
import {DetailCowPage} from "../cow/detail-cow/detail-cow.page";
import {DetailFarmPage} from "./detail-farm/detail-farm.page";

@Component({
  selector: 'app-farm',
  templateUrl: './farm.page.html',
  styleUrls: ['./farm.page.scss'],
})
export class FarmPage implements OnInit {
farms: Farm[] = [];
  constructor(private modalCtrl: ModalController,
              private apiService: ApiService) { }

  ngOnInit() {
    this.getfarmsprod();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  getfarmsprod() {
    Preferences.get({key: 'seed'}).then((result) => {
      if (result.value) {
        this.farms = JSON.parse(result.value);
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

  async openPage(page: any, id: any, data?: any) {
    const modal = await this.modalCtrl.create({
      component: page,
      id: id,
      componentProps: {
        farm: data
      }
    });
    await modal.present();
  }

  goToDetailFarm(farm: Farm) {
    this.openPage(DetailFarmPage, 'detail-farm', farm);
  }
}
