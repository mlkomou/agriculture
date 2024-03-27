import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFarmPageRoutingModule } from './add-farm-routing.module';

import { AddFarmPage } from './add-farm.page';
import {ImageCropperModule} from "ngx-image-cropper";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        IonicModule,
        AddFarmPageRoutingModule,
        ReactiveFormsModule,
        ImageCropperModule,
        TranslateModule
    ],
  declarations: [AddFarmPage]
})
export class AddFarmPageModule {}
