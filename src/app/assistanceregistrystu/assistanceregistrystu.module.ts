import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceregistrystuPageRoutingModule } from './assistanceregistrystu-routing.module';

import { AssistanceregistrystuPage } from './assistanceregistrystu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceregistrystuPageRoutingModule
  ],
  declarations: [AssistanceregistrystuPage]
})
export class AssistanceregistrystuPageModule {}
