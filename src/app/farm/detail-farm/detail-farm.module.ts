import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailFarmPageRoutingModule } from './detail-farm-routing.module';

import { DetailFarmPage } from './detail-farm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailFarmPageRoutingModule
  ],
  declarations: [DetailFarmPage]
})
export class DetailFarmPageModule {}
