import { SupabaseauthService } from './../supabaseauth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageServiceService } from '../storage-service.service';
import { SupabasedataService } from '../supabasedata.service';

interface profiles {
  name: string;
  last_name: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements AfterViewInit {
  profile: profiles = {
    name: '',
    last_name: '',
  };
  pendingAssistances: any;
  constructor(
    private supabaseauthService: SupabaseauthService,
    private alertController: AlertController,
    private storageService: StorageServiceService,
    private supabaseService: SupabasedataService
  ) {}

  async ngAfterViewInit() {
    const profile = await this.storageService.get('profile');
    this.profile = {
      name: profile.name,
      last_name: profile.last_name,
    };

    //If have internet connection, get information from the database and update the local storage
    if (navigator.onLine) {
      const { data: asignatures, error } =
        await this.supabaseService.getAsignatureFromStudent(profile.id);

      if (error) {
        console.log('Error fetching asignatures', error);
      }

      if (asignatures) {
        await this.storageService.set('asignatures', asignatures);
      }

      const pendingAssistances = await this.storageService.get(
        'pendingAssistance'
      );

      if (pendingAssistances) {
        this.pendingAssistances = pendingAssistances;
        pendingAssistances.forEach(async (pending: any) => {
          const { data: pendingData, error: pendingError } =
            await this.supabaseService.generateAsistance(pending, profile.id);

          if (pendingError) {
            console.error(pendingError);
          }

          if (pendingData) {
            const pendingArray = await this.storageService.get(
              'pendingAssistance'
            );

            if (pendingArray) {
              const newPendingArray = pendingArray.filter(
                (item: any) => item.id !== pending.id
              );
              await this.storageService.set(
                'pendingAssistance',
                newPendingArray
              );
            }
          }
        });
      }

      asignatures?.forEach(async (asignature) => {
        const { data: asistance, error: errorSec } =
          await this.supabaseService.getAsistanceByStudent(
            profile.id,
            asignature.sectionId
          );

        if (errorSec) {
          console.error(errorSec);
        }

        if (asistance) {
          asistance.map((item: any, index) => {
            item.index = index + 1;
            return item;
          });
          await this.storageService.set(asignature.sectionId, asistance);
        }
      });
    }
  }

  async ngOnInit() {}

  async signout() {
    await this.supabaseauthService.signOut();
    await this.storageService.clearUserStatus();
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
