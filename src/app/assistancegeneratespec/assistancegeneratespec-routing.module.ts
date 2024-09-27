import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistancegeneratespecPage } from './assistancegeneratespec.page';

const routes: Routes = [
  {
    path: '',
    component: AssistancegeneratespecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistancegeneratespecPageRoutingModule {}
