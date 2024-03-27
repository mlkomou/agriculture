import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCowPageRoutingModule } from './add-cow-routing.module';

import { AddCowPage } from './add-cow.page';
import { ImageCropperModule } from 'ngx-image-cropper';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddCowPageRoutingModule,
        ReactiveFormsModule,
        ImageCropperModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ],
  declarations: [AddCowPage]
})
export class AddCowPageModule {}
