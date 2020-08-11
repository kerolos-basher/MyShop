import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { ControlshopingcardService } from '../../userService/controlshopingcard.service';
import { UserShopingCard } from '../../userViwModels/user-shoping-card';
import { Doneuser } from '../../userViwModels/doneuser';
import { SetDonrUserService } from '../../userService/set-donr-user.service';
import { ShardShopingQuantatyService } from 'src/app/shairdService/shard-shoping-quantaty.service';

@Component({
  selector: 'app-chekout',
  templateUrl: './chekout.component.html',
  styleUrls: ['./chekout.component.scss']
})
export class ChekoutComponent implements OnInit {
  productcomfromdb: UserShopingCard[];
  quantatyfromservice: number;
  newdoneuser: Doneuser;
  totalprice:number;
  priceforonepro:number;
  constructor(private authService: AuthService,
    private shopingservise: SetDonrUserService,
    private controlshopng: ControlshopingcardService,
    private comingquantaty: ShardShopingQuantatyService, ) { }
  saveorder(name: string, mobilenumber: number, adress: string, city: string) {
    this.authService.authState.subscribe((user) => {
      if (user) {
        for (var i in this.productcomfromdb) {
          if (user.name == this.productcomfromdb[i].username
            && this.productcomfromdb[i].productquantay > 0) {
            this.newdoneuser = new Doneuser(user.name,
              name,
              mobilenumber,
              adress,
              city,
              this.productcomfromdb[i].id,
              this.productcomfromdb[i].name,
              this.productcomfromdb[i].productquantay,
              this.productcomfromdb[i].price,
              this.productcomfromdb[i].imgurl);
            this.shopingservise.insertdoneuser(this.newdoneuser).subscribe(
              (nd) => { console.log(nd); },
              (err) => { console.log(err) }
            );
          }
        }
        this.controlshopng.deletshopingcard(user.name).subscribe(
          (nd) => { console.log(nd); },
          (err) => { console.log(err); });

        this.comingquantaty.changeMessage(0);
      }
    });

  }
  getprice(pro: UserShopingCard) {
    this.priceforonepro = pro.productquantay * pro.price;

  }
  ngOnInit(): void {
    this.comingquantaty.currentMessage.subscribe(message => this.quantatyfromservice = message);
    this.controlshopng.getAllShopingproduct().subscribe((datad) => {
      this.productcomfromdb = datad;
      this.totalprice = 0;
      for (var i in this.productcomfromdb) {
        if (this.productcomfromdb[i].productquantay > 0) {
          this.totalprice += this.productcomfromdb[i].productquantay * this.productcomfromdb[i].price;
        }
      }
    }
    );
  }
}
