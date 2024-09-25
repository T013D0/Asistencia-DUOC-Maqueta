import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistancegeneratePageRoutingModule } from './assistancegenerate-routing.module';

import { AssistancegeneratePage } from './assistancegenerate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistancegeneratePageRoutingModule
  ],
  declarations: [AssistancegeneratePage]
})
export class AssistancegeneratePageModule {}
