import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowProductDetailsComponent } from '../component/show-product-details/show-product-details.component';
import { ChekoutComponent } from '../component/chekout/chekout.component';
import { OrdersuccessComponent } from '../component/ordersuccess/ordersuccess.component';
import { MyorderComponent } from '../component/myorder/myorder.component';


const routes: Routes = [
  {path:"showdedails/:name",component:ShowProductDetailsComponent},
  {path:"checkOut",component:ChekoutComponent},
  {path:"myorder",component:MyorderComponent},
  {path:"ordersuccess",component:OrdersuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserShopingModelRoutingModule { }
