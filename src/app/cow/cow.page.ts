import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Farm} from "../model/farm";
import {ApiService} from "../api.service";
import {Preferences} from "@capacitor/preferences";
import {AddFarmPage} from "../farm/add-farm/add-farm.page";
import {Cow} from "../model/cow";
import {AddCowPage} from "./add-cow/add-cow.page";
import {DetailCowPage} from "./detail-cow/detail-cow.page";

@Component({
  selector: 'app-cow',
  templateUrl: './cow.page.html',
  styleUrls: ['./cow.page.scss'],
})
export class CowPage implements OnInit {
  cows: Cow[] = [];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getfarmsprod();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  async openPage(page: any, id: any, data?: any) {
    const modal = await this.modalCtrl.create({
      component: page,
      id: id,
      componentProps: {
        cow: data
      }
    });
    await modal.present();
  }

  goToDetailCow(cow: Cow) {
    this.openPage(DetailCowPage, 'detail-cow', cow);
  }

  getfarmsprod() {
    Preferences.get({key: 'cow'}).then((result) => {
      if (result.value) {
        this.cows = JSON.parse(result.value);
      }
    });
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
      if (result.data == 1) {
        this.getfarmsprod();
      }
    });
  }
}
