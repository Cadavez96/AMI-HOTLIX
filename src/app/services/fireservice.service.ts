/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../FirestoreDocs/tasks';
import { User } from '../FirestoreDocs/User';
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { arrayUnion, arrayRemove } from 'firebase/firestore';

 @Injectable({
 providedIn: 'root'
 })
 export class FireserviceService {
 private snapshotChangesSubscription: any;
 constructor(
 public af: AngularFirestore,
 )
 {}

/*saveUserLocal(){

  const currentUser = firebase.auth().currentUser;
  return this.af.collection('Users').doc(currentUser.uid).snapshotChanges().subscribe(data => {
    data.payload(e => ({
      localStorage.setItem('name', user.Name);
    }

  });}*/


 getRooms() {
  const currentUser = firebase.auth().currentUser;
  return this.af.collection('Rooms').snapshotChanges();
  }

  getCheapRooms() {
    const currentUser = firebase.auth().currentUser;
    console.log('cheappprooms');
    return  this.af.collection('Rooms', ref => ref.where('PriceValue', '<', 300)).snapshotChanges();
    }

    saveUserLocal(){

      const currentUser = firebase.auth().currentUser;
      return this.af.collection('Users').doc(currentUser.uid).ref.get().then((doc) => {
        const data = doc.data();
        localStorage.setItem('name', data['name']);
        localStorage.setItem('email', data['email']);
        localStorage.setItem('photo', data['photo']);

      });
    }

    addUserFavorite(prodId: any){
      const currentUser = firebase.auth().currentUser;
      return this.af.collection('Users').doc(currentUser.uid).update({
        favorites : arrayUnion(prodId)
      });
     }

     removeUserFavorite(prodId: any){
      const currentUser = firebase.auth().currentUser;
      return this.af.collection('Users').doc(currentUser.uid).update({
        favorites : arrayRemove(prodId)
      });
     }

     addUserFavoriteRoom(prodId: any){
      const currentUser = firebase.auth().currentUser;
      return this.af.collection('Rooms').doc(prodId).update({
        favorites : arrayUnion(currentUser.uid)
      });
     }

     removeUserFavoriteRoom(prodId: any){
      const currentUser = firebase.auth().currentUser;
      return this.af.collection('Rooms').doc(prodId).update({
        favorites : arrayRemove(currentUser.uid)
      });
     }


     addUserBuy(roomId: any){
      const currentUser = firebase.auth().currentUser;
      return this.af.collection('Users').doc(currentUser.uid).update({
        rooms : arrayUnion(roomId)
      });
     }

     removeUserBuy(prodId: any){
      const currentUser = firebase.auth().currentUser;
      return this.af.collection('Users').doc(currentUser.uid).update({
        rooms : arrayRemove(prodId)
      });
     }

     getUserInfo(){
      const currentUser = firebase.auth().currentUser;
      return this.af.collection('Users').doc(currentUser.uid).snapshotChanges();
     }

     getRoomsById(roomsIds: any){
      return this.af.collection('Rooms',ref=>ref.where(firebase.firestore.FieldPath.documentId(),'in',roomsIds)).snapshotChanges();
    }

    updateUserToken(tk: string){
      const currentUser = firebase.auth().currentUser;
      console.log('curent user: '+currentUser.uid);
      return this.af.collection('Users').doc(currentUser.uid).update({
        token: tk,
      });

    }


  createUser(user: User){
    const currentUser = firebase.auth().currentUser;
    return this.af.collection('Users').doc(currentUser.uid).set(user)
.then(() => {
  console.log('Document successfully written!');
})
.catch((error) => {
  console.error('Error writing document: ', error);
});

  }


  unsubscribeOnLogOut(){
  //remember to unsubscribe from the snapshotChanges
  this.snapshotChangesSubscription.unsubscribe();
  }
 }
