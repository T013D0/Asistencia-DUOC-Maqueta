import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistancescanqrPageRoutingModule } from './assistancescanqr-routing.module';

import { AssistancescanqrPage } from './assistancescanqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistancescanqrPageRoutingModule
  ],
  declarations: [AssistancescanqrPage]
})
export class AssistancescanqrPageModule {}
