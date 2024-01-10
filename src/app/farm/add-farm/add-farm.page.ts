import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../api.service";
import { Preferences } from '@capacitor/preferences';
import {Farm} from "../../model/farm";
import {Cow} from "../../model/cow";
import {Farmer} from "../../model/farmer";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageCroppedEvent} from "ngx-image-cropper";
@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.page.html',
  styleUrls: ['./add-farm.page.scss'],
})
export class AddFarmPage implements OnInit {
  seedFrom: FormGroup;
  cows: Cow[] = [];
  @Input() data: Farm;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageFile: any;
  saving: boolean = false;
  currentUser: Farmer = JSON.parse(localStorage.getItem("user"));

  @ViewChild('imagePicker') imagePicker: ElementRef;
  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              public apiService: ApiService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.data) {
      this.createForm(this.data);
    } else {
      this.createForm(new Farm());
    }
  }

  pickImage() {
    this.imagePicker.nativeElement.click();
  }

  ckeckImage() {
    this.imageChangedEvent = null;
    console.log(this.imageFile);
  }

  createForm(data: Farm) {
    this.seedFrom = this.fb.group({
      id: [data.id],
      area: [data.area, Validators.required],
      crop: [data.crop, Validators.required],
      seedCost: [data.seedCost, Validators.required],
      fertilizerCost1: [data.fertilizerCost1, Validators.required],
      fertilizerCost2: [data.fertilizerCost2, Validators.required],
      herbicideCost2: [data.herbicideCost2, Validators.required],
      laborCost2: [data.laborCost2, Validators.required],
      yield: [data.yield, Validators.required],
      salePrice: [data.salePrice, Validators.required],
      imagePath: [data.imagePath],
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

  formatForm(seed: Farm): Farm {
    return {
      id: seed.id,
      area: seed.area,
      crop: seed.crop,
      seedCost: seed.seedCost,
      fertilizerCost1: seed.fertilizerCost1,
      fertilizerCost2: seed.fertilizerCost2,
      herbicideCost2: seed.herbicideCost2,
      laborCost2: seed.laborCost2,
      yield: seed.yield,
      salePrice: seed.salePrice,
      imagePath: seed.imagePath
    }
  }
  saveSeed() {
    if (this.seedFrom.valid) {
      this.saving = true;
      this.apiService.saveSeed(this.formatForm(this.seedFrom.value), this.imageFile, this.currentUser.id).subscribe((res) => {
        if (res.ok) {
          this.saving = false;
          this.apiService.showToast(res.message, 3000, 'success', 'top');
          this.modalCtrl.dismiss(res.data);
        } else {
          this.saving = false;
          this.apiService.showToast(res.message, 3000, 'danger', 'top');
        }
      }, error => {
        this.saving = false;
        this.apiService.showToast("Erreur d'enregistrement de la graine, veuillez réessayer plus tard", 3000, 'danger', 'top');
      });
    }
  }


  saveOrUpdata() {
    if (this.data) {
      this.saveSeed();
    } else {
      if (this.imageFile) {
        this.saveSeed();
      } else {
        this.apiService.showToast("Veuillez importer une photo", 3000, 'secondary', 'top');
      }
    }
  }

  getinseminationCost(event: any) {

  }
}
