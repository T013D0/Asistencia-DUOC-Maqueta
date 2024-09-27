import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Assistancestudent1PageRoutingModule } from './assistancestudent1-routing.module';

import { Assistancestudent1Page } from './assistancestudent1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Assistancestudent1PageRoutingModule
  ],
  declarations: [Assistancestudent1Page]
})
export class Assistancestudent1PageModule {}
