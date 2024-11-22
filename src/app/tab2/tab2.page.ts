import { SupabaseauthService } from './../supabaseauth.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    private supabaseauthService: SupabaseauthService,
    private alertController: AlertController
  ) {}



  async signout() {
    await this.supabaseauthService.signOut();
    await this.showAlert(
      "Salida exitosa" ,"¡Hasta luego!",
    );
    window.location.href = 'tabs/tab1';
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
