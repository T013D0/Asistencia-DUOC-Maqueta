import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceprofPageRoutingModule } from './assistanceprof-routing.module';

import { AssistanceprofPage } from './assistanceprof.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceprofPageRoutingModule
  ],
  declarations: [AssistanceprofPage]
})
export class AssistanceprofPageModule {}
