import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {PaymentPage} from "../payment/payment.page";
import {ProdAndQty} from "../product";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
prodQties: ProdAndQty[] = JSON.parse(localStorage.getItem('cart'));

totalPrice: number = 0;
totalQty: number = 0;
  constructor(private modalCtrl: ModalController, public productService: ProductService) { }

  ngOnInit() {
    if (this.prodQties) {
      console.log(this.prodQties);
      this.calculateToTalPrice(this.prodQties);
    }
  }
  deleteProd(i: number) {
    this.prodQties.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(this.prodQties));
    this.totalQty = 0;
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


  increase(index: number) {
    this.prodQties[index].qty++;
    this.calculateToTalPrice(this.prodQties);
  }

  decrease(index: number) {
    if (this.prodQties[index].qty > 1) {
      this.prodQties[index].qty--;
      this.calculateToTalPrice(this.prodQties);
    }
  }
  async goToPay() {
    const modal = await this.modalCtrl.create({
      component: PaymentPage,
      id: 'payment',
      componentProps: {
        prodQties: this.prodQties
      }
    });
    await modal.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
