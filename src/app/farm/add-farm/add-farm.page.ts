import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../api.service";
import { Preferences } from '@capacitor/preferences';
import {Farm} from "../../model/farm";
@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.page.html',
  styleUrls: ['./add-farm.page.scss'],
})
export class AddFarmPage implements OnInit {
seedFrom: FormGroup;
seeds: Farm[] = [];
@Input() data: Farm;
updating: boolean = false;
expenseValue: number;
  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              private apiService: ApiService) { }

  ngOnInit() {
    if (this.data) {
      this.createForm(this.data);
      this.updating = true;
      this.expenseValue = this.data.seedCost + this.data.fertilizerCost1 + this.data.fertilizerCost2 + this.data.herbicideCost2 + this.data.laborCost2;
      console.log('expenseValue', this.expenseValue);
    } else {
      this.createForm(new Farm());
    }
  }

  createForm(data: Farm) {
    this.seedFrom = this.fb.group({
      id: [data.id],
      area: [data.area],
      crop: [data.crop],
      seedCost: [data.seedCost],
      fertilizerCost1: [data.fertilizerCost1],
      fertilizerCost2: [data.fertilizerCost2],
      herbicideCost2: [data.herbicideCost2],
      laborCost2: [data.laborCost2],
      yield: [data.yield],
      salePrice: [data.salePrice],
      expense: [data.expense],
      grosseIncome: [data.grosseIncome],
      profit: [data.profit],
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  saveSeed() {
    Preferences.get({key: 'seed'}).then((old) => {
      if (old.value) {
        let oldSeeds: Farm[] = JSON.parse(old.value);
        oldSeeds.push(this.seedFrom.value);
        Preferences.set({key: "seed", value: JSON.stringify(oldSeeds)}).then((res) => {
          this.apiService.showToast('Seed saved successfully', 3000, 'success', 'top');
          this.modalCtrl.dismiss(1);
        }).catch((Err) => {
          this.apiService.showToast('Save error, try again', 3000, 'danger', 'top');
        });
      } else {
        this.seeds.push(this.seedFrom.value);
       if (this.seeds.length > 0) {
         Preferences.set({key: "seed", value: JSON.stringify(this.seeds)}).then((res) => {
           this.apiService.showToast('Seed saved successfully', 3000, 'success', 'top');
           this.modalCtrl.dismiss(1);
         }).catch((Err) => {
           this.apiService.showToast('Save error, try again', 3000, 'danger', 'top');
         });
       }
      }
    })
    if (this.seeds.length > 0) {

    }
  }
  updataSeed() {
    Preferences.get({key: 'seed'}).then((old) => {
      if (old.value) {
        let oldSeeds: Farm[] = JSON.parse(old.value);
        let indexSeedToupdate: number = oldSeeds.findIndex(toUpdate => {
          return toUpdate.id == this.data.id
        });
        if (indexSeedToupdate != -1) {
          oldSeeds[indexSeedToupdate].id = this.seedFrom.value.id;
          oldSeeds[indexSeedToupdate].seedCost = this.seedFrom.value.seedCost;
          oldSeeds[indexSeedToupdate].laborCost2 = this.seedFrom.value.laborCost2;
          oldSeeds[indexSeedToupdate].herbicideCost2 = this.seedFrom.value.herbicideCost2;
          oldSeeds[indexSeedToupdate].area = this.seedFrom.value.area;
          oldSeeds[indexSeedToupdate].crop = this.seedFrom.value.crop;
          oldSeeds[indexSeedToupdate].fertilizerCost1 = this.seedFrom.value.fertilizerCost1;
          oldSeeds[indexSeedToupdate].fertilizerCost2 = this.seedFrom.value.fertilizerCost2;
          oldSeeds[indexSeedToupdate].grosseIncome = this.seedFrom.value.grosseIncome;
          oldSeeds[indexSeedToupdate].profit = this.seedFrom.value.profit;
          oldSeeds[indexSeedToupdate].expense = this.seedFrom.value.expense;
          oldSeeds[indexSeedToupdate].yield = this.seedFrom.value.yield;
          oldSeeds[indexSeedToupdate].salePrice = this.seedFrom.value.salePrice;
        }
        Preferences.set({key: "seed", value: JSON.stringify(oldSeeds)}).then((res) => {
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
}
