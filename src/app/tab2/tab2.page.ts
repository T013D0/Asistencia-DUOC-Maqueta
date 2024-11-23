import { SupabaseauthService } from './../supabaseauth.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  profile: any;
  constructor(
    private supabaseauthService: SupabaseauthService,
    private alertController: AlertController,
    private storageService: StorageServiceService
  ) {}

  async ngOnInit() {
    const profile = await this.storageService.get('profile');
    this.profile = profile;
  }

  async signout() {
    await this.supabaseauthService.signOut();
    this.storageService.remove('user');
    this.storageService.remove('profile');
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
