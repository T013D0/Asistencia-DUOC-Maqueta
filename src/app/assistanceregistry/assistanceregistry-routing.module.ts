import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceregistryPage } from './assistanceregistry.page';

const routes: Routes = [
  {
    path: '',
    component: AssistanceregistryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceregistryPageRoutingModule {}
