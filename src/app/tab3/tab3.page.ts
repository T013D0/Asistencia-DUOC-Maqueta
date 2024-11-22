import { SupabaseauthService } from './../supabaseauth.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  name: any;
  last_name: any;
  constructor(
    private supabaseauthService: SupabaseauthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.supabaseauthService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.name = user.user_metadata['name'];
        this.last_name = user.user_metadata['last_name'];
      }
    });
  }

  async signout() {
    await this.supabaseauthService.signOut();
    await this.showAlert('Salida exitosa', '¡Hasta luego!');
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
