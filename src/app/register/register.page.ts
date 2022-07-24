/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthserviceService } from '../services/fireauthservice.service';
import { FireserviceService } from '../services/fireservice.service';
import { Router } from '@angular/router';
import { User } from '../FirestoreDocs/User';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
@Component({
 selector: 'app-register',
 templateUrl: './register.page.html',
 styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  title = 'cloudsSorage';
  selectedFile: File = null;
  fb;
  photo = 'assets/icon/user.jpg';
  photoStorage = 'https://firebasestorage.googleapis.com/v0/b/lab6-68153.appspot.com'+
  '/o/Users%2F1657396109590?alt=media&token=b3b517c1-e748-4c3f-bff0-213e477a9f30';
  downloadURL: Observable<string>;

 validations_form: FormGroup;
 loading: any;
 errorMessage = '';
 successMessage = '';
 validationMessages = {
  names: [{type:'required', message:'Please Enter your Full Names'}],
      phone: [{type:'required', message:'Please Enter your Phone No.'}],
 email: [
 { type: 'required', message: 'Email is required.' },
 { type: 'pattern', message: 'Enter a valid email.' }
 ],
 password: [
 { type: 'required', message: 'Password is required.' },
 { type: 'minlength', message: 'Password must be at least 5 characters long.' }
 ]
 };
 constructor(
 private authService: FireauthserviceService,
 private fireService: FireserviceService,
 private formBuilder: FormBuilder,
 public modalCtrl: ModalController,
 public loadingCtrl: LoadingController,
 private alertCtrl: AlertController,
 private navCtr: NavController,
 private router: Router,
 private storage: AngularFireStorage
 ) {

  this.loading = this.loadingCtrl;

 }
 ngOnInit() {
 this.validations_form = this.formBuilder.group({
 email: new FormControl('', Validators.compose([
 Validators.required,
 Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
 ])),
 password: new FormControl('', Validators.compose([
 Validators.minLength(5),
 Validators.required
 ])),
 phone: new FormControl('', Validators.compose([
  Validators.required
])),
names: new FormControl('', Validators.compose([
  Validators.required
])),
 });
 }

 onFileSelected(event) {
  const n = Date.now();
  const file = event.target.files[0];
  const filePath = `Users/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`Users/${n}`, file);
  task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
            this.photo = url;
            this.photoStorage = url;
          }
          console.log(this.fb);
        });
      })
    )
    .subscribe(url => {
      if (url) {
        console.log(url);
      }
    });
}

 registerUser(value){
  this.showalert();
   try{
  this.authService.doRegister(value).then( response =>{
    console.log(response);
    this.authService.doLogin(value);
    //if(response.user){

        const user: User = {name:value.names, phone: value.phone, email: value.email, photo: this.photoStorage};
        this.fireService.createUser(user);
        localStorage.setItem('name', value.names);
        localStorage.setItem('email', value.email);
        localStorage.setItem('photo', value.photo);


    this.loading.dismiss();
    this.router.navigate(['home']);
    //}
  }, error=>{
    this.loading.dismiss();
    this.errorLoading(error.message);

  });
}catch(erro){
  console.log(erro);
}
 }


 async errorLoading(message: any){
   const loading = await this.alertCtrl.create({
     header:'Error Registering',
     message,
     buttons:[{
       text:'ok',
       handler: ()=>{
       this.navCtr.navigateBack(['signup']);
     }
     }]
   });
    await loading.present();
 }




 async showalert(){
const load = await this.loadingCtrl.create({
  message:'please wait....',

});
 load.present();
}



  async goWelcome(){

    this.router.navigate(['/welcome']);

  }

}
