import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginsucessPageRoutingModule } from './loginsucess-routing.module';

import { LoginsucessPage } from './loginsucess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginsucessPageRoutingModule
  ],
  declarations: [LoginsucessPage]
})
export class LoginsucessPageModule {}
