import { Component, OnInit } from '@angular/core';
import { UserloginService } from 'src/app/shairdService/userlogin.service';
import { AuthService } from 'angularx-social-login';
import { SendUserDataToServerService } from 'src/app/shairdService/send-user-data-to-server.service';
import { UserLoginInfo } from 'src/app/ShairdViewModels/user-login-info';
import { CheckIfIsAdminService } from 'src/app/Admin/adminService/check-if-is-admin.service';
import { ShardShopingQuantatyService } from 'src/app/shairdService/shard-shoping-quantaty.service';
import { ControlshopingcardService } from 'src/app/userShoping/userService/controlshopingcard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
userlog=false;
userName;
currentuser:UserLoginInfo;
isadmin:boolean;
userid:number;
newuser:UserLoginInfo;
quantatyfromservice=0;
 
  constructor(  private userloginservice:UserloginService,
                private authService: AuthService,
                private senddatatodatabase:SendUserDataToServerService,
                private checkifisadmin :CheckIfIsAdminService,
                private clearshopingcard:ControlshopingcardService,
                private commingquantatyfromservice:ShardShopingQuantatyService) { }
  login()
  {
    this.userloginservice.signInWithGoogle();
    
    this.authService.authState.subscribe((user) => {
      if(user)
      {
        this.userid = parseInt(user.id);
        this.newuser = new UserLoginInfo(this.userid,user.name,user.email);
        this.senddatatodatabase.insertuser(this.newuser).subscribe(
          (dat)=>{console.log(dat);},
          (err)=>{console.log(err);}
          );
      }
    });
  }
  logout()
  {
    this.authService.authState.subscribe((user) => {
      if(user)
      {
        this.clearshopingcard.deletshopingcard(user.name).subscribe();
        this.commingquantatyfromservice.changeMessage(0);
      }
    });
  
    this.userloginservice.signOut();
    this.userlog=false;
  }
  ngOnInit(): void {
    this.commingquantatyfromservice.currentMessage.subscribe(message => this.quantatyfromservice = message)
    this.authService.authState.subscribe((user) => {
      if(user)
      {
        this.userlog=true;
        this.userName = user.name;
        this.userid = parseInt(user.id);
        this.currentuser = new UserLoginInfo( this.userid,user.name,user.email);
        this.checkifisadmin.checkadmin(this.currentuser).subscribe(
          (adm)=>{this.isadmin = adm}
        );
      }
      
      this.userlog = (user != null);
    });
  }

}
