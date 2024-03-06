import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {DetailProductPage} from "./detail-product/detail-product.page";
import {PanierPage} from "./panier/panier.page";
import {ProductService} from "./product.service";
import {ProdAndQty, Product} from "./product";
import {CheckoutPage} from "./checkout/checkout.page";

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.page.html',
  styleUrls: ['./ecommerce.page.scss'],
})
export class EcommercePage implements OnInit {
page: number = 0;
size: number = 20;
products: any[] = [];
carts: ProdAndQty[] = JSON.parse(localStorage.getItem('cart'));
  constructor(private modalCtrl: ModalController,
              public productService: ProductService) { }

  ngOnInit() {
    this.getProducts(this.page, this.size);
    this.refreshCart();
  }

  async goToDetail(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetailProductPage,
      id: 'detail-product',
      componentProps: {
        id: id
      }
    });
    await modal.present();
  }

  refreshCart() {
    setInterval(() => {
      this.carts = JSON.parse(localStorage.getItem('cart'));
    }, 1000);
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
          qty: 1,
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
        qty: 1,
        product: product
      });
      localStorage.setItem('cart', JSON.stringify(proQty));
      this.productService.showToast('Ajouté dans le panier', 3000, 'bottom', 'success');
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async goToCart() {
    if (this.carts && this.carts.length > 0) {
      const modal = await this.modalCtrl.create({
        component: CheckoutPage,
        id: 'panier'
      });
      await modal.present();
    }
  }

  getProducts(page: number, size: number) {
    this.productService.getProducts(page, size).subscribe((res) => {
      if (res.ok) {
        this.products = res.data.content;
      }
    });
  }
}
