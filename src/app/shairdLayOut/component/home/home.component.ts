import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductService } from 'src/app/shairdService/get-product.service';
import { ControlshopingcardService } from 'src/app/userShoping/userService/controlshopingcard.service';
import { UserloginService } from 'src/app/shairdService/userlogin.service';
import { AuthService } from 'angularx-social-login';
import { ShardShopingQuantatyService } from 'src/app/shairdService/shard-shoping-quantaty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quantatytoservice = 0;
  constructor(private router: Router, private userloginservice: UserloginService,
    private authService: AuthService, private controlshopingproduct: ControlshopingcardService,
    private commingquantatyfromservice:ShardShopingQuantatyService) {

  }

  ngOnInit(): void {
    this.commingquantatyfromservice.currentMessage.subscribe(message => this.quantatytoservice = message)

    this.authService.authState.subscribe((user) => {
      if (user) 
      {
        /////////
        this.controlshopingproduct.getAllShopingproduct().subscribe(
          (data) => {
            this.authService.authState.subscribe((user) => {
              if (user) {
                for (let i in data) {
                  this.quantatytoservice += data[i].productquantay;
                  this.commingquantatyfromservice.changeMessage(this.quantatytoservice);

                }
              }
            });
          });
        //////////
      }

    });


    this.router.navigate(['/myhome']);

  }

}
