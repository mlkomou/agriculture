import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {PaymentPage} from "../payment/payment.page";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async goToPay() {
    const modal = await this.modalCtrl.create({
      component: PaymentPage,
      id: 'payment'
    });
    await modal.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
