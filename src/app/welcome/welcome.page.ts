import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {


  constructor(
    public modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login() {
    this.modalCtrl.create({
      component: LoginPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'login-modal',
    }).then(modalEl => {
      modalEl.present();
    });
  }

  async goLogin(){

    this.router.navigate(['/login']);

  }

  async register() {
    const modal = await this.modalCtrl.create({
      component: RegisterPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'register-modal',
    });

    return await modal.present();
  }

  async goRegister(){

    this.router.navigate(['/register']);

  }
}
