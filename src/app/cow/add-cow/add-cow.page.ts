import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Farm} from "../../model/farm";
import {ModalController} from "@ionic/angular";
import {ApiService} from "../../api.service";
import {Preferences} from "@capacitor/preferences";
import {Cow} from "../../model/cow";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-add-cow',
  templateUrl: './add-cow.page.html',
  styleUrls: ['./add-cow.page.scss'],
})
export class AddCowPage implements OnInit {

  cowFrom: FormGroup;
  cows: Cow[] = [];
  @Input() data: Cow;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageFile: any;

  @ViewChild('imagePicker') imagePicker: ElementRef;
  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              private apiService: ApiService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.data) {
      this.createForm(this.data);
    } else {
      this.createForm(new Cow());
    }
  }

  pickImage() {
    this.imagePicker.nativeElement.click();
  }

  ckeckImage() {
    this.imageChangedEvent = null;
    console.log(this.imageFile);
  }

  createForm(data: Cow) {
    this.cowFrom = this.fb.group({
      id: [data.id],
      gender: [data.gender, Validators.required],
      inseminationCost: [data.inseminationCost, Validators.required],
      inseminationDate: [data.inseminationDate, Validators.required],
      calvingDate: [data.calvingDate, Validators.required],
      milkProduction: [data.milkProduction, Validators.required],
      feed: [data.feed, Validators.required],
      vetCost: [data.vetCost, Validators.required],
      milkPrice: [data.milkPrice, Validators.required]
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    this.imageFile = event.blob;
    // event.blob can be used to upload the cropped image
  }

  formatForm(cow: Cow): Cow {
    return {
      id: cow.id,
      gender: cow.gender,
      inseminationCost: cow.inseminationCost,
      inseminationDate: new Date(cow.inseminationDate),
      calvingDate: new Date(cow.calvingDate),
      milkProduction: cow.milkProduction,
      feed: cow.feed,
      vetCost: cow.vetCost,
      milkPrice: cow.milkPrice
    }
  }
  saveSeed() {
   if (this.cowFrom.valid) {
     this.apiService.saveCow(this.formatForm(this.cowFrom.value), this.imageFile).subscribe((res) => {
       console.log(res);
     })
   //   Preferences.get({key: 'cow'}).then((old) => {
   //     if (old.value) {
   //       let oldSeeds: Farm[] = JSON.parse(old.value);
   //       oldSeeds.push(this.cowFrom.value);
   //       Preferences.set({key: "cow", value: JSON.stringify(oldSeeds)}).then((res) => {
   //         this.apiService.showToast('Seed saved successfully', 3000, 'success', 'top');
   //         this.modalCtrl.dismiss(1);
   //       }).catch((Err) => {
   //         this.apiService.showToast('Save error, try again', 3000, 'danger', 'top');
   //       });
   //     } else {
   //       this.cows.push(this.cowFrom.value);
   //       if (this.cows.length > 0) {
   //         Preferences.set({key: "cow", value: JSON.stringify(this.cows)}).then((res) => {
   //           this.apiService.showToast('Seed saved successfully', 3000, 'success', 'top');
   //           this.modalCtrl.dismiss(1);
   //         }).catch((Err) => {
   //           this.apiService.showToast('Save error, try again', 3000, 'danger', 'top');
   //         });
   //       }
   //     }
   //   })
   //   if (this.cows.length > 0) {
   //
   //   }
   // } else {
   //
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

  }
}
