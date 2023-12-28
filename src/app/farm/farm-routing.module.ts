import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmPage } from './farm.page';

const routes: Routes = [
  {
    path: '',
    component: FarmPage
  },
  {
    path: 'add-farm',
    loadChildren: () => import('./add-farm/add-farm.module').then( m => m.AddFarmPageModule)
  },
  {
    path: 'detail-farm',
    loadChildren: () => import('./detail-farm/detail-farm.module').then( m => m.DetailFarmPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmPageRoutingModule {}
