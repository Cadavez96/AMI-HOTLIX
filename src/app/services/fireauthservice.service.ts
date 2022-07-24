import { DebugElement, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireserviceService } from './fireservice.service';
import * as firebase from 'firebase/app';
import { debug } from 'console';



@Injectable({
  providedIn: 'root'
})


export class FireauthserviceService {

  constructor(private firebaseService: FireserviceService, public afAuth: AngularFireAuth ){}

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => resolve(res), err => reject(err));});

  }


  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(res => resolve(res), err => reject(err));});
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      console.log('logout');
      this.afAuth.signOut().then((res) => {
        this.firebaseService.unsubscribeOnLogOut();
        resolve(res);
      }).catch((error) => {
          console.log(error);
          reject();
      });
    });
  }
}
