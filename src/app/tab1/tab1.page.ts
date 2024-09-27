// tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page';
import { User } from '../../const/types';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  usr: User = {
    email: '',
    password: '',
  };

  constructor(
    private tabsPage: TabsPage,
    private router: Router,
    private alertController: AlertController
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
    const email = this.usr.email;

    const isStudent =
      email.includes('@duocuc.cl') || email.includes('@duoc.cl');
    const isTeacher =
      email.includes('@profesor.duocuc.cl') ||
      email.includes('@profesor.duoc.cl');

    if (isStudent) {
      this.router.navigate(['/tabs/tab3']);
      const alert = await this.alertController.create({
        header: 'Sesion iniciada',
        message: 'Bienvenido a duocUC',
        buttons: this.alertButtons,
      });
      await alert.present();
    } else if (isTeacher) {
      this.router.navigate(['/tabs/tab2']);
      const alert = await this.alertController.create({
        header: 'Sesion iniciada',
        message: 'Bienvenido a duocUC',
        buttons: this.alertButtons,
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El correo ingresado no es valido',
        buttons: this.alertButtons,
      });
      await alert.present();
    }

    //this.router.navigate(['/tabs/tab2']);
  }
}
