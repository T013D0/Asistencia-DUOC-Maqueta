import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { Component, OnInit } from '@angular/core';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-assistancescanqr',
  templateUrl: './assistancescanqr.page.html',
  styleUrls: ['./assistancescanqr.page.scss'],
})
export class AssistancescanqrPage implements OnInit {
  isLoading: boolean = true;
  scanResult = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform
  ) {
    this.loadData(); }


async startScan() {
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

  if(data){
    this.scanResult = data?.barcode?.displayValue;

  }

}




  ngOnInit(): void {

    if(this.platform.is('capacitor')) {
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

}
