import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-date',
  templateUrl: './date.page.html',
  styleUrls: ['./date.page.scss'],
})
export class DatePage implements OnInit {
  dateChoosed: Date;
  taday = new Date().toISOString();
  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  getDateValue(event) {
    console.log('date ev', event);
    this.dateChoosed = event.detail.value;
  }

  cancel() {
    this.popoverCtrl.dismiss(null);
  }
  validate() {
    this.popoverCtrl.dismiss(this.dateChoosed);
  }
}
