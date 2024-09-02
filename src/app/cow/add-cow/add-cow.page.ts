import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IonModal, ModalController, PopoverController} from "@ionic/angular";
import {ApiService} from "../../api.service";
import {Cow} from "../../model/cow";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {DomSanitizer} from "@angular/platform-browser";
import {Farmer} from "../../model/farmer";
import {DatePage} from "../../date/date.page";

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

  inseminationDate: any;
  calvingDate: any;
  @ViewChild('genderModal') genderModal: IonModal;
  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              public apiService: ApiService,
              private sanitizer: DomSanitizer,
              private popover: ModalController) { }

  ngOnInit() {
    if (this.data) {
      this.inseminationDate = this.data.inseminationDate;
      this.calvingDate = this.data.calvingDate;
      this.createForm(this.data);
    } else {
      this.createForm(new Cow());
    }
  }

  async chooseInseminationDate() {
    const pop = await this.popover.create({
      component: DatePage,
      backdropDismiss: false,
      id: 'insemination'
    });
    await pop.present();
    pop.onDidDismiss().then((result) => {
      if (result.data) {
        this.inseminationDate = new Date(result.data);
      } else {
        this.cowFrom.value.inseminationDate = null;
      }
    });
  }

  async chooseCalvingDate() {
    const pop = await this.popover.create({
      component: DatePage,
      backdropDismiss: false,
      id: 'calving'
    });
    await pop.present();
    pop.onDidDismiss().then((result) => {
      if (result.data) {
        this.calvingDate = new Date(result.data);
      } else {
        this.cowFrom.value.calvingDate = null;
      }
    });
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
      gender: [data.gender],
      inseminationCost: [data.inseminationCost],
      inseminationDate: [data.inseminationDate],
      calvingDate: [data.calvingDate],
      milkProduction: [data.milkProduction],
      feed: [data.feed],
      vetCost: [data.vetCost],
      milkPrice: [data.milkPrice],
      // new attr
      genitor: [data.genitor],
      genitrice: [data.genitrice],
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
      inseminationDate: new Date(this.inseminationDate),
      calvingDate: new Date(this.calvingDate),
      milkProduction: cow.milkProduction,
      feed: cow.feed,
      vetCost: cow.vetCost,
      milkPrice: cow.milkPrice,
      // new attr
      genitor: cow.genitor,
      genitrice: cow.genitrice,
      // en new attr
      imagePath: cow.imagePath,
      // id: cow.id,
      // identification: cow.identification,
      // gender: cow.gender,
      // inseminationCost: cow.inseminationCost,
      // inseminationDate: new Date(this.inseminationDate),
      // calvingDate: new Date(this.calvingDate),
      // milkProduction: cow.milkProduction,
      // feed: cow.feed,
      // vetCost: cow.vetCost,
      // milkPrice: cow.milkPrice,
      // genitor: cow.genitor,
      // imagePath: cow.imagePath
    }
  }
  saveSeed() {
   if (this.cowFrom.valid) {
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

  deleteImage() {
    this.imageFile = null;
    this.croppedImage = null;
  }

  chooseGender(gender: string) {
    this.cowFrom.patchValue({
      gender: gender
    });

    this.genderModal.dismiss();
  }
}
