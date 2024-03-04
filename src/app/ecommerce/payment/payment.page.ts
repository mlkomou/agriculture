import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {OrderData, ProdAndQty} from "../product";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
@Input() prodQties: ProdAndQty[];
  totalPrice: number = 0;
  totalQty: number = 0;
  payments: {
    name: string;
    logo: string;
  }[] = [
    {
      name: 'Oragenge Money',
      logo: 'assets/img/om.png'
    },
    {
      name: 'Moov Money',
      logo: 'assets/img/moov.png'
    },
    {
      name: 'Visa',
      logo: 'assets/img/visa.jpg'
    },
  ];

  currentPayIndex: number;
  currentUser: any = JSON.parse(localStorage.getItem("user"));
  currentPayment: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.prodQties) {
      console.log(this.prodQties);
      this.calculateToTalPrice(this.prodQties);
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
  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectPay(i: number) {
    this.currentPayIndex = i;
    this.currentPayment = this.payments[i].name;
  }

  formatOrderData(): OrderData {
    return {
      order: this.prodQties,
      userId: this.currentUser.id,
      payementType: this.currentPayment
    }
  }

  payOrder() {
    console.log(this.formatOrderData());
  }
}
