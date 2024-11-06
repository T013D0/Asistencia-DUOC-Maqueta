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





@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(),AngularFireModule.initializeApp(environment.firebaseConfig)
    ,AngularFireAuthModule,AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
