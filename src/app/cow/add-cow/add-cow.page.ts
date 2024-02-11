import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Farm} from "../../model/farm";
import {ModalController} from "@ionic/angular";
import {ApiService} from "../../api.service";
import {Preferences} from "@capacitor/preferences";
import {Cow} from "../../model/cow";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {DomSanitizer} from "@angular/platform-browser";
import {Farmer} from "../../model/farmer";

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
      identification: [data.identification],
      gender: [data.gender, Validators.required],
      inseminationCost: [data.inseminationCost, Validators.required],
      inseminationDate: [data.inseminationDate, Validators.required],
      calvingDate: [data.calvingDate, Validators.required],
      milkProduction: [data.milkProduction, Validators.required],
      feed: [data.feed, Validators.required],
      vetCost: [data.vetCost, Validators.required],
      milkPrice: [data.milkPrice, Validators.required],
      // new attr
      genitor: [data.genitor, Validators.required],
      // en new attr
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

  formatForm(cow: Cow): Cow {
    return {
      id: cow.id,
      identification: cow.identification,
      gender: cow.gender,
      inseminationCost: cow.inseminationCost,
      inseminationDate: new Date(cow.inseminationDate),
      calvingDate: new Date(cow.calvingDate),
      milkProduction: cow.milkProduction,
      feed: cow.feed,
      vetCost: cow.vetCost,
      milkPrice: cow.milkPrice,
      genitor: cow.genitor,
      imagePath: cow.imagePath
    }
  }
  saveSeed() {
   if (this.cowFrom.valid) {
     console.log(this.formatForm(this.cowFrom.value));
     this.saving = true;
     this.apiService.saveCow(this.formatForm(this.cowFrom.value), this.imageFile, this.currentUser.id).subscribe((res) => {
       if (res.ok) {
         this.saving = false;
         this.apiService.showToast(res.message, 3000, 'success', 'top');
         this.modalCtrl.dismiss(res.data);
       } else {
         this.saving = false;
         this.apiService.showToast(res.message, 3000, 'danger', 'top');
       }
     }, error => {
       console.log(error);
       this.saving = false;
       this.apiService.showToast("Erreur d'enregistrement de l'animal, veuillez réessayer plus tard", 3000, 'danger', 'top');
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
