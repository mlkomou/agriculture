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

  saveCow(cow: Cow, photo: any, userId: number): Observable<Iresponse> {
    let form: FormData = new FormData();
    form.append("cow", JSON.stringify(cow));
    if (photo) {
      form.append("photo", photo, new Date().getTime()+ ".png");
    }
    return this.httpClient.post<Iresponse>(`${this.apiUrl}/cows/save/${userId}`, form);
  }

  getCow(page: number, size: number, userId: number): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/cows/page/${page}/${size}/${userId}`);
  }

  saveSeed(cow: Farm, photo: any, userId: number): Observable<Iresponse> {
    let form: FormData = new FormData();
    form.append("seed", JSON.stringify(cow));
    if (photo) {
      form.append("photo", photo, new Date().getTime()+ ".png");
    }
    return this.httpClient.post<Iresponse>(`${this.apiUrl}/seeds/save/${userId}`, form);
  }

  getSeed(page: number, size: number, userId: number): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/seeds/page/${page}/${size}/${userId}`);
  }

  getCrops(): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/seeds/crop`);
  }

  cowByGender(userId: number): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/cows/cow-by-gender/${userId}`);
  }
  getByCrop(userId: number): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/seeds/state_crop/${userId}`);
  }
  getIcomeByCrop(userId: number): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/seeds/income_crop/${userId}`);
  }
  getYieldByCrop(userId: number): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/seeds/yield/${userId}`);
  }
  getExpenses(userId: number): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/seeds/expense/${userId}`);
  }

  getVideos(): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/videos/get-all`);
  }

  deleteSeed(seedId: number): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/seeds/delete/${seedId}`);
  }
  deleteCow(cowId: number): Observable<Iresponse> {
    return this.httpClient.get<Iresponse>(`${this.apiUrl}/cows/delete/${cowId}`);
  }

  public makeDownloadImage(filname: string): string {
    return `${environment.apiUrl}/downloads/${filname}`;
  }

}
