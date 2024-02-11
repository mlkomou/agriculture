import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {PaymentPage} from "../payment/payment.page";
import {CheckoutPage} from "../checkout/checkout.page";

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async goToCheck() {
    const modal = await this.modalCtrl.create({
      component: CheckoutPage,
      id: 'payment'
    });
    await modal.present();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
