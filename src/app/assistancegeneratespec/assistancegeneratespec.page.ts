import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistancegeneratespec',
  templateUrl: './assistancegeneratespec.page.html',
  styleUrls: ['./assistancegeneratespec.page.scss'],
})
export class AssistancegeneratespecPage implements OnInit {
  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  alertButtons = ['Aceptar'];

  async gotoGenerate() {
    this.router.navigate(['/assistancegenerate']);
    const alert = await this.alertController.create({
      header: 'Registro de asistencia',
      message: 'Codigo QR generado con exito',
      buttons: this.alertButtons,
    });
    await alert.present();
  }

  async goBack() {
    this.router.navigate(['/tabs/tab2']);
    const alert = await this.alertController.create({
      header: 'Saliendo del menu',
      message: 'Saliste del menu de asistencia con exito.',
      buttons: this.alertButtons,
    });
    await alert.present();
  }
}
