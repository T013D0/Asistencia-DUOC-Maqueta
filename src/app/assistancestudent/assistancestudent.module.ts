import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistancestudentPageRoutingModule } from './assistancestudent-routing.module';

import { AssistancestudentPage } from './assistancestudent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistancestudentPageRoutingModule
  ],
  declarations: [AssistancestudentPage]
})
export class AssistancestudentPageModule {}
