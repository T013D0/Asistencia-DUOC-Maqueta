import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminpanelPageRoutingModule } from './adminpanel-routing.module';
import { AdminpanelPage } from './adminpanel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Ensure this is imported
    IonicModule,
    AdminpanelPageRoutingModule
  ],
  declarations: [AdminpanelPage]
})
export class AdminpanelPageModule {}