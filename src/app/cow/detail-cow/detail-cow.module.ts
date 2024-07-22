import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCowPageRoutingModule } from './detail-cow-routing.module';

import { DetailCowPage } from './detail-cow.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailCowPageRoutingModule,
        TranslateModule
    ],
  declarations: [DetailCowPage]
})
export class DetailCowPageModule {}
