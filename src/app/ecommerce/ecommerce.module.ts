import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcommercePageRoutingModule } from './ecommerce-routing.module';

import { EcommercePage } from './ecommerce.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EcommercePageRoutingModule,
        TranslateModule
    ],
  declarations: [EcommercePage]
})
export class EcommercePageModule {}
