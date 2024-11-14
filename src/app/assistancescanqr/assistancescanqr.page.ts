import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-assistancescanqr',
  templateUrl: './assistancescanqr.page.html',
  styleUrls: ['./assistancescanqr.page.scss'],
})
export class AssistancescanqrPage implements OnInit, OnDestroy {
  isLoading: boolean = true;
  scanResult = '';
  isOnline: boolean = navigator.onLine;

  constructor(
    private modalController: ModalController,
    private platform: Platform
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
        LensFacing: LensFacing.Back
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResult = data?.barcode?.displayValue;
    }
  }

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
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