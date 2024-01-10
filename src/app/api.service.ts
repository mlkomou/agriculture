import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Farm} from "./model/farm";
import {ToastController} from "@ionic/angular";
import {environment} from "../environments/environment";
import {Farmer} from "./model/farmer";
import {Iresponse} from "./model/iresponse";
import {Cow} from "./model/cow";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = environment.apiUrl;

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

  signup(farmer: Farmer): Observable<Iresponse> {
    let form: FormData = new FormData();
    form.append("user", JSON.stringify(farmer));
    return this.httpClient.post<Iresponse>(`${this.apiUrl}/auth/signup`, form);
  }

  signin(farmer: any): Observable<Iresponse> {
    return this.httpClient.post<Iresponse>(`${this.apiUrl}/auth/signin`, farmer);
  }

  checkUser(phone: string): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/users/check/${phone}`);
  }

  saveCow(cow: Cow, photo: any): Observable<Iresponse> {
    let form: FormData = new FormData();
    form.append("cow", JSON.stringify(cow));
    form.append("photo", photo, new Date().getTime()+ ".png");
    return this.httpClient.post<Iresponse>(`${this.apiUrl}/cows/save`, form);
  }

}
