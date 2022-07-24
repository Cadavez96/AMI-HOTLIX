import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SETTINGS } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
initializeApp(environment.firebase);

export const firebaseConfig = {
  apiKey: 'AIzaSyCzP7B6P_kT-IZ5NqjEwMXra9dQZrmHlMk',
  authDomain: 'lab6-68153.firebaseapp.com',
  projectId: 'lab6-68153',
  storageBucket: 'lab6-68153.appspot.com',
  messagingSenderId: '941988327184',
  appId: '1:941988327184:web:0998790b0144555556bf95',
  vapidKey: 'BGha4yYeAng2ExRioxpFYcSHOATQNkG7pzzHm58WpdiR9ql6PnGCXDK0OoLVTvwCeRSyaxWXRaTCSCRui1mvNPE'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
 AngularFirestoreModule,
 AngularFireDatabaseModule,
 AngularFireAuthModule,
 AngularFireStorageModule,
    AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SETTINGS, useValue: {} }],
  bootstrap: [AppComponent],
})
export class AppModule {}
