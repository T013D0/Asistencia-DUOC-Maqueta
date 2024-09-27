import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Assistanceregistry1Page } from './assistanceregistry1.page';

const routes: Routes = [
  {
    path: '',
    component: Assistanceregistry1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Assistanceregistry1PageRoutingModule {}
