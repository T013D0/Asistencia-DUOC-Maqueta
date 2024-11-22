import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page';
import { AlertController, LoadingController } from '@ionic/angular';
import { StorageServiceService } from '../storage-service.service';
import { SupabaseauthService } from '../supabaseauth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@supabase/supabase-js';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  credentials = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private tabsPage: TabsPage,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private storageService: StorageServiceService,
    private supabaseauthService: SupabaseauthService
  ) {}

  get email() {
    return this.credentials.controls.email;
  }

  get password() {
    return this.credentials.controls.password;
  }

  ngOnInit() {
    this.tabsPage.hideTabBar = true;
  }

  ionViewWillLeave() {
    this.tabsPage.hideTabBar = false;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async login() {
    if (!this.credentials.valid) {
      await this.showAlert(
        'Error',
        'Por favor, completa todos los campos correctamente'
      );
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'circular',
    });
    await loading.present();

    try {
      const { data, error } = await this.supabaseauthService.signIn({
        email: this.email.value,
        password: this.password.value,
      });

      console.log('Supabase signIn response:', { data, error });

      if (error) {
        await loading.dismiss();
        await this.showAlert('Error', 'Usuario o contraseña incorrectos');
        return;
      }

      if (data.user) {
        await this.storageService.set('user', JSON.stringify(data.user));
        await loading.dismiss();
        await this.showAlert('Éxito', 'Inicio de sesión exitoso');
        //Check if emails contains "profesor.duocuc.cl"
        if (data.user.user_metadata['is_student']) {
          this.router.navigate(['/tabs/tab3']);
        } else {
          this.router.navigate(['/tabs/tab2']);
        }
      }
    } catch (err) {
      await loading.dismiss();
      await this.showAlert(
        'Error',
        'Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.'
      );
    }
  }
}
