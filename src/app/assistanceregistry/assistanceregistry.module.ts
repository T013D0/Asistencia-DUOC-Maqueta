import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceregistryPageRoutingModule } from './assistanceregistry-routing.module';

import { AssistanceregistryPage } from './assistanceregistry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceregistryPageRoutingModule
  ],
  declarations: [AssistanceregistryPage]
})
export class AssistanceregistryPageModule {}
