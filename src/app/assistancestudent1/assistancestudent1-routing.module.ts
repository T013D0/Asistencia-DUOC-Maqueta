import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Assistancestudent1Page } from './assistancestudent1.page';

const routes: Routes = [
  {
    path: '',
    component: Assistancestudent1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Assistancestudent1PageRoutingModule {}
