import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Preferences} from "@capacitor/preferences";
import {Cow} from "../model/cow";
import {AddCowPage} from "./add-cow/add-cow.page";
import {DetailCowPage} from "./detail-cow/detail-cow.page";
import {Farmer} from "../model/farmer";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-cow',
  templateUrl: './cow.page.html',
  styleUrls: ['./cow.page.scss'],
})
export class CowPage implements OnInit {
  cows: Cow[] = [];
  toDay: Date = new  Date();
  currentUser: Farmer = JSON.parse(localStorage.getItem("user"));
  page: number = 0;
  size: number = 20;
  constructor(private modalCtrl: ModalController,
              public apiService: ApiService) { }

  ngOnInit() {
    // this.getfarmsprod();
    this.getCows(this.page, this.size);
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

  getCows(page: number, size: number) {
    this.apiService.getCow(page, size).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.cows = res.data.content;
      }
    });
  }

  goToDetailCow(cow: Cow) {
    this.openPage(DetailCowPage, 'detail-cow', cow);
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
        this.getCows(this.page, this.size);
      }
    });
  }
}
