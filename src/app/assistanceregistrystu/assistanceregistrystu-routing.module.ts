import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceregistrystuPage } from './assistanceregistrystu.page';

const routes: Routes = [
  {
    path: '',
    component: AssistanceregistrystuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceregistrystuPageRoutingModule {}
