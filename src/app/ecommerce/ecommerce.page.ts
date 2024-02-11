import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {DetailProductPage} from "./detail-product/detail-product.page";
import {PanierPage} from "./panier/panier.page";

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.page.html',
  styleUrls: ['./ecommerce.page.scss'],
})
export class EcommercePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async goToDetail() {
    const modal = await this.modalCtrl.create({
      component: DetailProductPage,
      id: 'detail-product'
    });
    await modal.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async goToCart() {
    const modal = await this.modalCtrl.create({
      component: PanierPage,
      id: 'panier'
    });
    await modal.present();
  }
}
