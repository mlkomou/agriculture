import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Iresponse} from "../model/iresponse";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
apiUrl: string = environment.apiUrl + "/products";
  constructor(private http: HttpClient, private toatsrt: ToastController) { }

  getProducts(page: number, size: number): Observable<Iresponse> {
    return this.http.get<Iresponse>(`${this.apiUrl}/get-all/${page}/${size}`);
  }

  getProductbyId(id: number): Observable<Iresponse> {
    return this.http.get<Iresponse>(`${this.apiUrl}/by-id/${id}`);
  }

  public makeDownloadImage(filname: string): string {
    return `${environment.apiUrl}/downloads/${filname}`;
  }

  async showToast(message: string, duration: number, position: 'top' | 'bottom' | 'middle', color: string) {
    let toast = await this.toatsrt.create({
      message: message,
      duration: duration,
      position: position,
      color: color
    });
    await toast.present();
  }
}
