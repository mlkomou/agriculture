import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {CheckoutPage} from "../checkout/checkout.page";
import {ProductService} from "../product.service";
import {OrderData, ProdAndQty, Product} from "../product";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
product: Product = new Product();
@Input() id: number;
qty: number = 1;
prodAndQty: any[] = [];

  order: OrderData[] = [];
  currentUser: any = JSON.parse(localStorage.getItem('user'));
  prodQties: ProdAndQty[] = [];
  prodAndQty1: ProdAndQty = new ProdAndQty();
  constructor(private modalCtrl: ModalController,
              public productService: ProductService,
              private toastr: ToastController
              ) { }

  ngOnInit() {
    if (this.id) {
      this.getProdById(this.id);
    }
  }

  increasePrice() {
    this.qty++;
    this.setOrder();
  }
  decreasePrice() {
    if (this.qty > 1) {
      this.qty--;
      this.setOrder();
    }
  }

  getProdById(id: number) {
    this.productService.getProductbyId(id).subscribe((res) => {
      if (res.ok) {
        this.product = res.data;
        this.setOrder();
      }
    });
  }

  setOrder() {
    if (this.product.id) {
      this.prodAndQty1.product = this.product;
      this.prodAndQty1.qty = this.qty;
    }
  }

  addToCart(product: Product) {
    let oldCart: ProdAndQty[] = JSON.parse(localStorage.getItem("cart"));
    if (oldCart) {
      // check if product is present in cart
      let index: number = oldCart.findIndex(value => {
        return value.product.id == product.id;
      });
      if (index == -1) {
        oldCart.push({
          qty: this.qty,
          product: product
        });
        localStorage.setItem('cart', JSON.stringify(oldCart));
        this.productService.showToast('Ajouté dans le panier', 3000, 'bottom', 'success');
      } else {
        this.productService.showToast('Ce produit existe déjà dans le panier', 3000, 'bottom', 'secondary');
      }

    } else {
      let proQty: ProdAndQty[] = [];
      proQty.push({
        qty: this.qty,
        product: product
      });
      localStorage.setItem('cart', JSON.stringify(proQty));
    }

  }


  async goToCheckout() {
   let cart: ProdAndQty[] = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      console.log('Cart present', cart);
      let index = cart.findIndex(value => {
        return value.product.id == this.product.id;
      });
      if (index == -1) {
        console.log('product not Present', index);
        this.productService.showToast("Ce produit existe déjà dans le panier", 2000, 'bottom', 'secondary');
      } else {

      }
    } else {
      console.log('cart not present');
      let prodQties: ProdAndQty[] = [];
      prodQties.push(this.prodAndQty1);
      localStorage.setItem("cart", JSON.stringify(prodQties));
    }
    const modal = await this.modalCtrl.create({
      component: CheckoutPage,
      id: 'checkout',
      // componentProps: {
      //   prodQties: prodQties
      // }
    });
    await modal.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
