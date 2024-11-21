import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SupabasedataService } from '../supabasedata.service';
import { SupabaseauthService } from '../supabaseauth.service';

@Component({
  selector: 'app-assistancegeneratespec',
  templateUrl: './assistancegeneratespec.page.html',
  styleUrls: ['./assistancegeneratespec.page.scss'],
})
export class AssistancegeneratespecPage implements OnInit {
  isLoading: boolean = true;
  sections: any;
  userId: string = '';
  constructor(
    private alertController: AlertController,
    private router: Router,
    private supabaseService: SupabasedataService,
    private supabaseauthService: SupabaseauthService
  ) {
    this.loadData();
  }
  loadData() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false; // Set to false after loading is complete
    }, 2000); // Adjust time as needed
  }

  ngOnInit() {
    this.supabaseauthService.getCurrentUser().subscribe((user) => {
      this.userId = user?.id || '';

      if (!this.userId) {
        return;
      }

      this.supabaseService
        .getSectionsByTeacher(this.userId)
        .then((sections) => {
          this.sections = sections.data;
        });
    });
  }

  alertButtons = ['Aceptar'];

  async gotoGenerate(id: string) {
    const { data, error } = await this.supabaseService.generateClass(id);

    console.log(data);

    if (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al generar el codigo QR',
        buttons: this.alertButtons,
      });
      await alert.present();
      return;
    }

    if (!data) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al generar el codigo QR',
        buttons: this.alertButtons,
      });
      await alert.present();
      return;
    }

    this.router.navigate(['/assistancegenerate/' + data.id]);
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
