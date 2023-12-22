import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Farm} from "./model/farm";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
              private toastCtrl: ToastController) { }

  getFarmProds(): Observable<Farm[]> {
   return this.httpClient.get<Farm[]>('assets/data/farm.json');
  }

  async showToast(message: string, duration: number, color: string, position: 'top' | 'bottom' | 'middle') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      color: color,
      position: position
    });
    await toast.present();
  }

}
