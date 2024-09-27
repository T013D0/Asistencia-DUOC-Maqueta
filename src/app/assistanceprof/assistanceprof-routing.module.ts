import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceprofPage } from './assistanceprof.page';

const routes: Routes = [
  {
    path: '',
    component: AssistanceprofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceprofPageRoutingModule {}
