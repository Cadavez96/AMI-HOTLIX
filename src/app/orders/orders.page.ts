/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FireserviceService } from '../services/fireservice.service';
import { FireauthserviceService } from '../services/fireauthservice.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {


  idsFavorites: any;
  roomsFavorites: Array<any> = [];

  constructor(private router: Router, public fser: FireserviceService,
    public nav: NavController, private authService: FireauthserviceService) { }




  ngOnInit() {


    this.fser.getUserInfo().subscribe(data=> {

      this.idsFavorites = data.payload.data()['rooms'],

      console.log('idsFavorites: '+this.idsFavorites);
      console.log('idsFavorites type: '+this.idsFavorites.type);

      this.fser.getRoomsById(this.idsFavorites).subscribe(data=> {
        this.roomsFavorites = data.map(e => ({
          $key: e.payload.doc.id,
          title: e.payload.doc.data()['Title'],
          price: e.payload.doc.data()['Price'],
          photo: e.payload.doc.data()['Photo'],
          location: e.payload.doc.data()['Location'],
          likes: e.payload.doc.data()['Likes'],
          priceNumber: e.payload.doc.data()['PriceValue'],
          description: e.payload.doc.data()['Description'],
          specs: e.payload.doc.data()['Specs']
          })

        );
      });

      });}






  goHome(){
    this.router.navigate(['/home']);

}

goFavorites(){
  this.router.navigate(['/favorites']);
}

debug(){
  console.log(this.roomsFavorites);
}


clickProduct(room: Array<any>){

  localStorage.setItem('backPage', 'orders');
  this.nav.navigateForward('room-page', { state: room });

}

removeRoom(id: string){

  this.fser.removeUserBuy(id);
  //window.location.reload();

}

logout(){
  this.authService.doLogout()
  .then(res => {
  this.router.navigate(['/welcome']);
  }, err => {
  console.log(err);
  });
  }


}
