import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductComponent } from '../component/manage-product/manage-product.component';
import { EditFormComponent } from '../component/edit-form/edit-form.component';
import { AddProductComponent } from '../component/add-product/add-product.component';
import { ManageorderComponent } from '../component/manageorder/manageorder.component';


const routes: Routes = [
  {path:'manageproduct',component:ManageProductComponent},
  {path:'editform/:name',component:EditFormComponent},
  {path:'manageorder',component:ManageorderComponent},
  {path:'addproduct',component:AddProductComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModelRoutingModule { }
