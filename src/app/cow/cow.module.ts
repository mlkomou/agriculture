import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CowPageRoutingModule } from './cow-routing.module';

import { CowPage } from './cow.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CowPageRoutingModule,
        TranslateModule
    ],
  declarations: [CowPage]
})
export class CowPageModule {}
