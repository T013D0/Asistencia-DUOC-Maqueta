import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistancescanqrPage } from './assistancescanqr.page';

const routes: Routes = [
  {
    path: '',
    component: AssistancescanqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistancescanqrPageRoutingModule {}
