import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {PaymentPage} from "../payment/payment.page";
import {OrderData, ProdAndQty} from "../product";
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
  currentUser: any = JSON.parse(localStorage.getItem("user"));
  currentPayment: string;
  saving: boolean = false;
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

  formatOrderData(): OrderData {
    return {
      order: this.prodQties,
      userId: this.currentUser.id,
      payementType: this.currentPayment
    }
  }

  payForDeliver() {
    this.currentPayment = 'deliver';
    // console.log(this.formatOrderData());
    this.saving = true;
    this.productService.saveOrder(this.formatOrderData()).subscribe((res) => {
      if (res.ok) {
        this.saving = false;
        this.productService.showToast(res.message, 3000, 'bottom', 'success');
        localStorage.removeItem("cart");
        this.modalCtrl.dismiss();
      } else {
        this.saving = false;
      }
    }, error => {
      this.saving = false;
    });
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
