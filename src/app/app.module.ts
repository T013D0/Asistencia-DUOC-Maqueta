import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';

import { environment } from '../environments/environment';
import{AngularFireAuthModule} from "@angular/fire/compat/auth";
import{AngularFireModule} from "@angular/fire/compat";
import{AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';





@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(),AngularFireModule.initializeApp(environment.firebaseConfig)
    ,AngularFireAuthModule,AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"asistenciaduoc-8b09b","appId":"1:791051020497:web:c015b11ed38b1ad7617df0","storageBucket":"asistenciaduoc-8b09b.firebasestorage.app","apiKey":"AIzaSyA37XqTCIAVmGkk9SgyV-yIwKfRbtbQikY","authDomain":"asistenciaduoc-8b09b.firebaseapp.com","messagingSenderId":"791051020497","measurementId":"G-R5FZPMQT45"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
