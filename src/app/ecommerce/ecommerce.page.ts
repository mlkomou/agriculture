import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {DetailProductPage} from "./detail-product/detail-product.page";
import {PanierPage} from "./panier/panier.page";
import {ProductService} from "./product.service";

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.page.html',
  styleUrls: ['./ecommerce.page.scss'],
})
export class EcommercePage implements OnInit {
page: number = 0;
size: number = 20;
products: any[] = [];
  constructor(private modalCtrl: ModalController,
              public productService: ProductService) { }

  ngOnInit() {
    this.getProducts(this.page, this.size);
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

  getProducts(page: number, size: number) {
    this.productService.getProducts(page, size).subscribe((res) => {
      if (res.ok) {
        this.products = res.data.content;
      }
    });
  }
}
