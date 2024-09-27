import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistancegeneratespecPageRoutingModule } from './assistancegeneratespec-routing.module';

import { AssistancegeneratespecPage } from './assistancegeneratespec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistancegeneratespecPageRoutingModule
  ],
  declarations: [AssistancegeneratespecPage]
})
export class AssistancegeneratespecPageModule {}
