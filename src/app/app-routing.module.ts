import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./pages/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'home',
    loadChildren:()=>import('./pages/home/home.module').then(m=>m.HomeModule),
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
