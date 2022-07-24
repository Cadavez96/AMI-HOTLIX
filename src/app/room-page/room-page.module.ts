import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPagePageRoutingModule } from './room-page-routing.module';

import { RoomPagePage } from './room-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPagePageRoutingModule
  ],
  declarations: [RoomPagePage]
})
export class RoomPagePageModule {}
