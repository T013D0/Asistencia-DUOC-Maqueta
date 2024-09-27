import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Assistanceregistry1PageRoutingModule } from './assistanceregistry1-routing.module';

import { Assistanceregistry1Page } from './assistanceregistry1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Assistanceregistry1PageRoutingModule
  ],
  declarations: [Assistanceregistry1Page]
})
export class Assistanceregistry1PageModule {}
