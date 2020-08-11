import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserShopingModelModule } from './userShoping/user-shoping-model/user-shoping-model.module';
import { AdminModelModule } from './Admin/admin-model/admin-model.module';
import { HeaderComponent } from './shairdLayOut/component/header/header.component';
import { HomeComponent } from './shairdLayOut/component/home/home.component';
import { FooterComponent } from './shairdLayOut/component/footer/footer.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { ShopingCardComponent } from './userShoping/component/shoping-card/shoping-card.component';
import { MyhomeComponent } from './shairdLayOut/myhome/myhome.component';
import{HttpClientModule} from '@angular/common/http';
import { ManageProductComponent } from './Admin/component/manage-product/manage-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { EditFormComponent } from './Admin/component/edit-form/edit-form.component';
import {FormsModule} from '@angular/forms';
import { AddProductComponent } from './Admin/component/add-product/add-product.component';
import { ShowProductDetailsComponent } from './userShoping/component/show-product-details/show-product-details.component';
import { ChekoutComponent } from './userShoping/component/chekout/chekout.component';
import { OrdersuccessComponent } from './userShoping/component/ordersuccess/ordersuccess.component';
import { MyorderComponent } from './userShoping/component/myorder/myorder.component';
import { ManageorderComponent } from './Admin/component/manageorder/manageorder.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("434640922138-9j5qiivgsmtrcmk9866phtlmf0nimhj8.apps.googleusercontent.com")
  },
]);
export function provideConfig() {
  return config;
}
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ShopingCardComponent,
    MyhomeComponent,
    ManageProductComponent,
    EditFormComponent,
    AddProductComponent,
    ShowProductDetailsComponent,
    ChekoutComponent,
    OrdersuccessComponent,
    MyorderComponent,
    ManageorderComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserShopingModelModule,
    AdminModelModule,
    SocialLoginModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
