import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopingCardComponent } from './userShoping/component/shoping-card/shoping-card.component';
import { MyhomeComponent } from './shairdLayOut/myhome/myhome.component';


const routes: Routes = [
 {path:'shopingcard' , component:ShopingCardComponent},
 {path:'myhome' , component:MyhomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
