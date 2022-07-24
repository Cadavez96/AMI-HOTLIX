/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FireserviceService } from '../services/fireservice.service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.page.html',
  styleUrls: ['./room-page.page.scss'],
})
export class RoomPagePage implements OnInit {

  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  room: any;
  favorite: boolean;
  userInfo: any;
  id: any;
  buy: boolean;
  backPage: string;



  constructor(
    private animatioCntrl: AnimationController,
    private router: Router,
    public fser: FireserviceService,
    private alertCtrl: AlertController
  ) {

    if (router.getCurrentNavigation().extras.state) {
      this.room = this.router.getCurrentNavigation().extras.state;
      console.log(this.room);
    }

    this.fser.getUserInfo().subscribe(data=> {

      this.userInfo = {
        email: data.payload.data()["email"],
        favorites: data.payload.data()["favorites"],
        name: data.payload.data()["name"],
        rooms: data.payload.data()["rooms"]
      };
      //console.log("user info: "+this.userInfo.favorites);
      this.favorite=false;
      this.buy = true;
      this.userInfo.favorites.forEach(element => {

        if (element === this.room.$key){
          this.favorite=true;
        }
      });
      this.userInfo.rooms.forEach(element => {

        if (element === this.room.$key){
          this.buy=false;
        }
      });

     });

     this.backPage = localStorage.getItem("backPage");

  }

  ngOnInit() {
    this.activeVariation = 'size';
  }

  changeFav(){
    if(this.favorite){
      this.favorite=false;
      this.fser.removeUserFavorite(this.room.$key);
      this.fser.removeUserFavoriteRoom(this.room.$key);
    }
    else{
      this.favorite=true;
      this.fser.addUserFavorite(this.room.$key);
      this.fser.addUserFavoriteRoom(this.room.$key);
    }

  }

  goBack(){

    this.router.navigate(['/'+this.backPage]);

  }

  async showAlert(){

    const alert = await this.alertCtrl.create({
      cssClass:'my-custom-class',
      header: 'Confirm Reservation',
      message: "Price: "+ this.room['priceNumber'] + '$',
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
          handler: (blah)=>{
          }
        },{
          text: 'Confirm',
          cssClass: 'confirm',
          handler: ()=>{
            this.buyRoom();
          }
        }
      ]

    });
    await alert.present();
  }

  buyRoom(){
    if(this.buy){
      this.buy=false;
      this.fser.addUserBuy(this.room.$key);
    }
    else{
      this.buy=true;
      this.fser.removeUserBuy(this.room.$key);
    }

  }

}
