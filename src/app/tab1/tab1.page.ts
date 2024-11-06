// tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page';
import { User } from '../../const/types';
import { AlertController } from '@ionic/angular';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  usr: User = {
    email: '',
    password: '',
    isStudent: false,
    isTeacher: false,
  };

  constructor(
    private tabsPage: TabsPage,
    private router: Router,
    private alertController: AlertController,
    private storageService: StorageServiceService
  ) {}

  ngOnInit() {
    this.tabsPage.hideTabBar = true;
  }

  ionViewWillLeave() {
    this.tabsPage.hideTabBar = false;
  }

  alertButtons = ['Aceptar'];

  //Redireccion a la pagina despues de aceptar el alert
  async onSubmit() {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u) => u.email === this.usr.email);

    if (!user) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: this.alertButtons,
      });
      await alert.present();
      return;
    }

    if (user.password !== this.usr.password) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: this.alertButtons,
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: 'Inicio de sesión exitoso',
      buttons: this.alertButtons,
    });

    await alert.present();

    this.storageService.set('user', JSON.stringify(user));

    if (!user.isStudent) {
      this.router.navigate(['/tabs/tab2']);
    } else {
      this.router.navigate(['/tabs/tab3']);
    }

    //this.router.navigate(['/tabs/tab2']);
  }
}
