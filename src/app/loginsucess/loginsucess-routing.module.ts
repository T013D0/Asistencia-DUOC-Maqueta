import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginsucessPage } from './loginsucess.page';

const routes: Routes = [
  {
    path: '',
    component: LoginsucessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginsucessPageRoutingModule {}
