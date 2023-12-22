import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCowPageRoutingModule } from './detail-cow-routing.module';

import { DetailCowPage } from './detail-cow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCowPageRoutingModule
  ],
  declarations: [DetailCowPage]
})
export class DetailCowPageModule {}
