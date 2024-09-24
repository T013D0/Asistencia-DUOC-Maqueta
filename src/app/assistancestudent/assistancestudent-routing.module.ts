import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistancestudentPage } from './assistancestudent.page';

const routes: Routes = [
  {
    path: '',
    component: AssistancestudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistancestudentPageRoutingModule {}
