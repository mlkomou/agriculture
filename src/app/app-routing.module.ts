import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./login/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cow',
    loadChildren: () => import('./cow/cow.module').then( m => m.CowPageModule)
  },
  {
    path: 'farm',
    loadChildren: () => import('./farm/farm.module').then( m => m.FarmPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'learning',
    loadChildren: () => import('./learning/learning.module').then( m => m.LearningPageModule)
  },
  {
    path: 'hello',
    loadChildren: () => import('./hello/hello.module').then( m => m.HelloPageModule)
  },
  {
    path: 'signup/:phone',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'ecommerce',
    loadChildren: () => import('./ecommerce/ecommerce.module').then( m => m.EcommercePageModule)
  },
  {
    path: 'date',
    loadChildren: () => import('./date/date.module').then( m => m.DatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
