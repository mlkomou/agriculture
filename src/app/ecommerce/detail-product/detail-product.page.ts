import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CheckoutPage} from "../checkout/checkout.page";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async goToCheckout() {
    const modal = await this.modalCtrl.create({
      component: CheckoutPage,
      id: 'checkout'
    });
    await modal.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
