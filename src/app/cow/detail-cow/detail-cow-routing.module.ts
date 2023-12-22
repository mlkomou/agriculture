import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCowPage } from './detail-cow.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCowPageRoutingModule {}
