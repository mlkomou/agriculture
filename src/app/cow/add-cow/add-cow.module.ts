import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCowPageRoutingModule } from './add-cow-routing.module';

import { AddCowPage } from './add-cow.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCowPageRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  declarations: [AddCowPage]
})
export class AddCowPageModule {}
