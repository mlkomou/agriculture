import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Farm} from "../../model/farm";
import {ModalController} from "@ionic/angular";
import {ApiService} from "../../api.service";
import {Preferences} from "@capacitor/preferences";
import {Cow} from "../../model/cow";

@Component({
  selector: 'app-add-cow',
  templateUrl: './add-cow.page.html',
  styleUrls: ['./add-cow.page.scss'],
})
export class AddCowPage implements OnInit {

  cowFrom: FormGroup;
  cows: Cow[] = [];
  @Input() data: Cow;
  profitValue: number = 0;
  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              private apiService: ApiService) { }

  ngOnInit() {
    if (this.data) {
      this.createForm(this.data);
    } else {
      this.createForm(new Cow());
    }
  }

  createForm(data: Cow) {
    this.cowFrom = this.fb.group({
      id: [data.id, Validators.required],
      gender: [data.gender, Validators.required],
      inseminationCost: [data.inseminationCost, Validators.required],
      inseminationDate: [data.inseminationDate, Validators.required],
      calvingDate: [data.calvingDate, Validators.required],
      milkProduction: [data.milkProduction, Validators.required],
      feed: [data.feed, Validators.required],
      vetCost: [data.vetCost, Validators.required],
      milkPrice: [data.milkPrice, Validators.required],
      // expense: [data.expense, Validators.required],
      // income: [data.income, Validators.required],
      // profit: [data.profit],
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  saveSeed() {
   if (this.cowFrom.valid) {
     Preferences.get({key: 'cow'}).then((old) => {
       if (old.value) {
         let oldSeeds: Farm[] = JSON.parse(old.value);
         oldSeeds.push(this.cowFrom.value);
         Preferences.set({key: "cow", value: JSON.stringify(oldSeeds)}).then((res) => {
           this.apiService.showToast('Seed saved successfully', 3000, 'success', 'top');
           this.modalCtrl.dismiss(1);
         }).catch((Err) => {
           this.apiService.showToast('Save error, try again', 3000, 'danger', 'top');
         });
       } else {
         this.cows.push(this.cowFrom.value);
         if (this.cows.length > 0) {
           Preferences.set({key: "cow", value: JSON.stringify(this.cows)}).then((res) => {
             this.apiService.showToast('Seed saved successfully', 3000, 'success', 'top');
             this.modalCtrl.dismiss(1);
           }).catch((Err) => {
             this.apiService.showToast('Save error, try again', 3000, 'danger', 'top');
           });
         }
       }
     })
     if (this.cows.length > 0) {

     }
   } else {

   }
  }
  updataSeed() {
    Preferences.get({key: 'cow'}).then((old) => {
      if (old.value) {
        let oldSeeds: Cow[] = JSON.parse(old.value);
        let indexSeedToupdate: number = oldSeeds.findIndex(toUpdate => {
          return toUpdate.id == this.data.id
        });
        if (indexSeedToupdate != -1) {
          oldSeeds[indexSeedToupdate].id = this.cowFrom.value.id;
          oldSeeds[indexSeedToupdate].profit = this.cowFrom.value.profit;
          oldSeeds[indexSeedToupdate].income = this.cowFrom.value.income;
          oldSeeds[indexSeedToupdate].expense = this.cowFrom.value.expense;
          oldSeeds[indexSeedToupdate].inseminationCost = this.cowFrom.value.inseminationCost;
          oldSeeds[indexSeedToupdate].feed = this.cowFrom.value.feed;
          oldSeeds[indexSeedToupdate].milkPrice = this.cowFrom.value.milkPrice;
          oldSeeds[indexSeedToupdate].milkProduction = this.cowFrom.value.milkProduction;
          oldSeeds[indexSeedToupdate].vetCost = this.cowFrom.value.vetCost;
          oldSeeds[indexSeedToupdate].calvingDate = this.cowFrom.value.calvingDate;
          oldSeeds[indexSeedToupdate].inseminationDate = this.cowFrom.value.inseminationDate;
          oldSeeds[indexSeedToupdate].gender = this.cowFrom.value.gender;

        }
        Preferences.set({key: "cow", value: JSON.stringify(oldSeeds)}).then((res) => {
          this.apiService.showToast('Seed saved successfully', 3000, 'success', 'top');
          this.modalCtrl.dismiss(1);
        }).catch((Err) => {
          this.apiService.showToast('Save error, try again', 3000, 'danger', 'top');
        });
      }
    });
  }

  saveOrUpdata() {
    if (this.data) {
      this.updataSeed();
    } else {
      this.saveSeed();
    }
  }

  getinseminationCost(event: any) {
    // this.profitValue = Number(event.detail.value);
    // this.cowFrom.value.expense = this.cowFrom.value.inseminationCost
    //   + this.cowFrom.value.feed
    //   + this.cowFrom.value.vetCost;
    //
    // this.cowFrom.value.income = (this.cowFrom.value.milkPrice * this.cowFrom.value.milkProduction);
    //
    // this.cowFrom.value.profit = this.cowFrom.value.income - this.cowFrom.value.expense;

  }
}
