import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomPagePage } from './room-page.page';

const routes: Routes = [
  {
    path: '',
    component: RoomPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomPagePageRoutingModule {}
