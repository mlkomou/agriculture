import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CowPage } from './cow.page';

const routes: Routes = [
  {
    path: '',
    component: CowPage
  },
  {
    path: 'add-cow',
    loadChildren: () => import('./add-cow/add-cow.module').then( m => m.AddCowPageModule)
  },
  {
    path: 'detail-cow',
    loadChildren: () => import('./detail-cow/detail-cow.module').then( m => m.DetailCowPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CowPageRoutingModule {}
