import { SupabaseauthService } from './../supabaseauth.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageServiceService } from '../storage-service.service';

interface profiles {
  name: string;
  last_name: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  profile: profiles = {
    name: '',
    last_name: '',
  };
  constructor(
    private supabaseauthService: SupabaseauthService,
    private alertController: AlertController,
    private storageService: StorageServiceService
  ) {}

  async ngOnInit() {
    const profile = await this.storageService.get('profile');
    this.profile = {
      name: profile.name,
      last_name: profile.last_name,
    };
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
