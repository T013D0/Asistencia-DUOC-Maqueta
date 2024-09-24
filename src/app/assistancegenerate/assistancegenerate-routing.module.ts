import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistancegeneratePage } from './assistancegenerate.page';

const routes: Routes = [
  {
    path: '',
    component: AssistancegeneratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistancegeneratePageRoutingModule {}
