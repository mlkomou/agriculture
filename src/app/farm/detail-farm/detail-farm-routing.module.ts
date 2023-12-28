import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailFarmPage } from './detail-farm.page';

const routes: Routes = [
  {
    path: '',
    component: DetailFarmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailFarmPageRoutingModule {}
