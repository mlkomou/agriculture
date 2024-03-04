import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CheckoutPage} from "../checkout/checkout.page";
import {ProdAndQty} from "../product";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
carts: ProdAndQty[] = JSON.parse(localStorage.getItem("cart"));
  totalPrice: number = 0;
  totalQty: number = 0;
  constructor(private modalCtrl: ModalController,
              public prodService: ProductService
              ) { }

  ngOnInit() {
    if (this.carts) {
      this.calculateToTalPrice(this.carts);
    }
  }

  calculateToTalPrice(prodQties: ProdAndQty[]) {
    let priceArr: number[] = [];
    let qtyArr: number[] = [];
    prodQties.forEach(value => {
      priceArr.push(value.product.price);
      qtyArr.push(value.qty);
    });

    this.totalPrice = priceArr.reduce((a, b) => a + b, 0);
    this.totalQty = qtyArr.reduce((a, b) => a + b, 0);
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
