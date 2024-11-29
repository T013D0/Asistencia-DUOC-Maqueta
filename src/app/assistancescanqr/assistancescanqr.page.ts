import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController, Platform } from '@ionic/angular';
import { SupabasedataService } from '../supabasedata.service';
import { AlertController, AlertButton } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SupabaseauthService } from '../supabaseauth.service';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-assistancescanqr',
  templateUrl: './assistancescanqr.page.html',
  styleUrls: ['./assistancescanqr.page.scss'],
})
export class AssistancescanqrPage implements OnInit {
  ngOnInit(): void {
    // Initialization logic here
  }
  isLoading: boolean = true;
  scanResult = '';
  scanError = '';
  userId: string = '';
  alertButtons: AlertButton[] = [{ text: 'Aceptar' }];

  constructor(
    private modalController: ModalController,
    private supabaseService: SupabasedataService,
    private alertController: AlertController,
    private supabaseauthService: SupabaseauthService,
    private storageService: StorageServiceService
  ) {
    this.loadData();
  }

  async startScan() {
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

    if (data && navigator.onLine) {
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
    } else {
      this.scanResult = data?.barcode?.displayValue;

      const pendingAssistance = await this.storageService.get(
        'pendingAssistance'
      );

      if (pendingAssistance) {
        if (!pendingAssistance.includes(this.scanResult)) {
          pendingAssistance.push(this.scanResult);
          await this.storageService.set('pendingAssistance', pendingAssistance);

          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Asistencia registrada correctamente',
            buttons: this.alertButtons,
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Ya se ha registrado la asistencia para esta clase',
            buttons: this.alertButtons,
          });
          await alert.present();
        }
      } else {
        await this.storageService.set('pendingAssistance', [this.scanResult]);

        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Asistencia registrada correctamente',
          buttons: this.alertButtons,
        });
        await alert.present();
      }
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
}
