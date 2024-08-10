import { Component, OnInit } from '@angular/core';
import {InfiniteScrollCustomEvent, ModalController} from "@ionic/angular";
import {ApiService} from "../api.service";
import {Farm} from "../model/farm";
import {AddFarmPage} from "./add-farm/add-farm.page";
import {DetailFarmPage} from "./detail-farm/detail-farm.page";
import {Farmer} from "../model/farmer";
import {Cow} from "../model/cow";

@Component({
  selector: 'app-farm',
  templateUrl: './farm.page.html',
  styleUrls: ['./farm.page.scss'],
})
export class FarmPage implements OnInit {
  seeds: Farm[] = [];
  toDay: Date = new  Date();
  currentUser: Farmer = JSON.parse(localStorage.getItem("user"));
  page: number = 0;
  size: number = 20;
  constructor(private modalCtrl: ModalController,
              public apiService: ApiService) { }

  ngOnInit() {
    // this.getfarmsprod();
    this.getFarms(this.page, this.size);
  }
  closeModal() {
    this.modalCtrl.dismiss();
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
    modal.onDidDismiss().then((result) => {
      if (result.data == 2) {
        this.getFarms(this.page, this.size);
      }
    });
  }

  getFarms(page: number, size: number) {
    this.apiService.getSeed(page, size, this.currentUser.id).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.seeds = res.data.content;
      }
    });
  }

  handleRefresh(event) {
    this.getFarms(0, this.size);
    event.target.complete();
  }

  onIonInfinite(ev) {
    this.page++;
    this.apiService.getSeed(this.page, this.size, this.currentUser.id).subscribe((res) => {
      console.log(this.page, this.size);
      if (res.ok) {
        let cowsDraft: Farm[] = res.data.content;
        if (cowsDraft.length > 0) {
          cowsDraft.forEach(value => {
            this.seeds.push(value);
          });
          (ev as InfiniteScrollCustomEvent).target.complete();
          console.log(ev);
        } else {
          this.page--;
          (ev as InfiniteScrollCustomEvent).target.complete();
        }
      }
    });
  }
  goToDetailFarm(cow: Farm) {
    this.openPage(DetailFarmPage, 'detail-seed', cow);
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
        this.getFarms(this.page, this.size);
      }
    });
  }
}
