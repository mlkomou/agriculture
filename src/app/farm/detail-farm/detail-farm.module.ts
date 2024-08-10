import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailFarmPageRoutingModule } from './detail-farm-routing.module';

import { DetailFarmPage } from './detail-farm.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailFarmPageRoutingModule,
        TranslateModule,
        ReactiveFormsModule
    ],
  declarations: [DetailFarmPage]
})
export class DetailFarmPageModule {}
