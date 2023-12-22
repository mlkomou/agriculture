import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CowPageRoutingModule } from './cow-routing.module';

import { CowPage } from './cow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CowPageRoutingModule
  ],
  declarations: [CowPage]
})
export class CowPageModule {}
