import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController, Platform } from '@ionic/angular';
import { SupabasedataService } from '../supabasedata.service';
import { AlertController, AlertButton } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SupabaseauthService } from '../supabaseauth.service';

@Component({
  selector: 'app-assistancescanqr',
  templateUrl: './assistancescanqr.page.html',
  styleUrls: ['./assistancescanqr.page.scss'],
})
export class AssistancescanqrPage implements OnInit, OnDestroy {
  ngOnInit(): void {
    // Initialization logic here
  }
  isLoading: boolean = true;
  scanResult = '';
  scanError = '';
  userId: string = '';
  isOnline: boolean = navigator.onLine;
  alertButtons: AlertButton[] = [{ text: 'Aceptar' }];

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private supabaseService: SupabasedataService,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private supabaseauthService: SupabaseauthService
  ) {
    this.loadData();
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  updateOnlineStatus() {
    this.isOnline = navigator.onLine;
  }

  async startScan() {
    if (!this.isOnline) {
      console.log('Cannot scan: No internet connection');
      return;
    }

    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        LensFacing: LensFacing.Back,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResult = data?.barcode?.displayValue;
      // Call gotoGenerateList with the scanned result
      this.supabaseauthService.getCurrentUser().subscribe(async (user) => {
        this.userId = user?.id || '';

        if (!this.userId) {
          return;
        }

        const { data } = await this.supabaseService.isAlreadyAssisted(
          this.scanResult,
          this.userId
        );

        if (data.is_present) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Ya se ha registrado la asistencia para esta clase',
            buttons: this.alertButtons,
          });
          await alert.present();
          return;
        }

        this.gotoGenerateAsistance(this.scanResult, this.userId);
      });
    }
  }
  async gotoGenerateAsistance(classId: string, studentId: string) {
    try {
      const { data, error } = await this.supabaseService.generateAsistance(
        classId,
        studentId
      );

      if (error) {
        this.scanError = error.message;
        throw new Error('No pertenece a la clase');
      }

      if (!data) {
        throw new Error('No se pudo generar el registro de asistencia');
      }

      // If successful, show a success message
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Asistencia registrada correctamente',
        buttons: this.alertButtons,
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: (error as any).message || 'Ocurrió un error inesperado',
        buttons: this.alertButtons,
      });
      await alert.present();
    }
  }

  loadData() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false; // Set to false after loading is complete
    }, 2000); // Adjust time as needed
  }

  ngOnDestroy() {
    // Remove event listeners
    window.removeEventListener('online', this.updateOnlineStatus.bind(this));
    window.removeEventListener('offline', this.updateOnlineStatus.bind(this));
  }
}
