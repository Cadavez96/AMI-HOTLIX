/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Injectable, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, NavController } from '@ionic/angular';
import { EMPTY } from 'rxjs';
import { Logs } from 'selenium-webdriver';
import { FireserviceService } from '../services/fireservice.service';
import { Task } from '../FirestoreDocs/tasks';
import { Router } from '@angular/router';
import { FireauthserviceService } from '../services/fireauthservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{

  rooms: Array<any> = [];
  likes: Array<any> = [];
  cheapRooms: Array<any> = [];
  user: Array<any> = [];
  userName: string;
  userPhoto: string;
  public searchInput: string;
  public searchResult: Array<any> = [];
  public selectedInput: any = {};
  public toggle: boolean = false;

  constructor(public fser: FireserviceService, private authService: FireauthserviceService,
    private router: Router, public nav: NavController, private alertCtrl: AlertController) {

    this.rooms = [
      {$key: EMPTY,  title: 'Milk', price: 100, photo: 'path', location: 'chelas', likes: ['123sdsd', '23zdsds32', '23sds2323']}];

    this.userName = localStorage.getItem('name');
    console.log(this.userName);
    this.userPhoto = localStorage.getItem('photo');
    console.log(this.userPhoto);
  }

  ngOnInit(): void {
    this.fser.getRooms().subscribe(data => {
    this.rooms = data.map(e => ({
    $key: e.payload.doc.id,
    title: e.payload.doc.data()['Title'],
    price: e.payload.doc.data()['Price'],
    photo: e.payload.doc.data()['Photo'],
    location: e.payload.doc.data()['Location'],
    likes: e.payload.doc.data()['Likes'],
    priceNumber: e.payload.doc.data()['PriceValue'],
    description: e.payload.doc.data()['Description'],
    specs: e.payload.doc.data()['Specs']
    }));
    //console.log(this.rooms);
    });

    this.fser.getCheapRooms().subscribe(data => {
      this.cheapRooms = data.map(e => ({
      $key: e.payload.doc.id,
      title: e.payload.doc.data()['Title'],
      price: e.payload.doc.data()['Price'],
      photo: e.payload.doc.data()['Photo'],
      location: e.payload.doc.data()['Location'],
      likes: e.payload.doc.data()['Likes'],
      priceNumber: e.payload.doc.data()['PriceValue'],
    description: e.payload.doc.data()['Description'],
    specs: e.payload.doc.data()['Specs']
      }));
      console.log(this.cheapRooms);
      });

    }


    clickRoom(room: Array<any>){

      localStorage.setItem('backPage', 'home');
      this.nav.navigateForward('room-page', { state: room });

    }

    goFav(){
      this.router.navigate(['/favorites']);
    }

    goOrders(){
      this.router.navigate(['/orders']);
    }

    fetchSeries(value: string) {

      if (value === '') {
        return (this.searchResult = []);
      }
      this.searchResult = this.rooms.filter(function(series) {
        return series.title.toLowerCase().includes(value.toLowerCase());
      });
      this.toggle = false;
      console.log(value);
      console.log(this.searchResult);
    }

    showDetails(room) {
      localStorage.setItem('backPage', 'home');
      this.nav.navigateForward('room-page', { state: room });
      this.searchResult= [];

    }

    async showAlert(){

      const alert = await this.alertCtrl.create({
        cssClass:'my-custom-class',
        header: 'Logging out',
        message: 'Are you sure?',
        buttons:[
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'cancel',
            handler: (blah)=>{
            }
          },{
            text: 'Yes',
            cssClass: 'confirm',
            handler: ()=>{
              this.logout();
            }
          }
        ]

      });
      await alert.present();
    }


    logout(){
      this.authService.doLogout();
      this.router.navigate(['/welcome']);
      }

}
