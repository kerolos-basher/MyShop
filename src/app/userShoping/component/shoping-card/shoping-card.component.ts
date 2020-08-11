import { Component, OnInit } from '@angular/core';
import { ShardShopingQuantatyService } from 'src/app/shairdService/shard-shoping-quantaty.service';
import { AuthService } from 'angularx-social-login';
import { ControlshopingcardService } from '../../userService/controlshopingcard.service';
import { UserShopingCard } from '../../userViwModels/user-shoping-card';
import { SendUserShopingService } from '../../userService/send-user-shoping.service';

@Component({
  selector: 'app-shoping-card',
  templateUrl: './shoping-card.component.html',
  styleUrls: ['./shoping-card.component.scss']
})

export class ShopingCardComponent implements OnInit {
  quantatyfromservice:number;
  total=0;
  prouctnewquantaty:number;
  totalforonpro:number;
  shopinglist:UserShopingCard[];
  userOrder:UserShopingCard;
  constructor(private comingquantaty:ShardShopingQuantatyService,
                               private authService: AuthService,
                                 private controlshopng:ControlshopingcardService,
                                 private sendorderservice:SendUserShopingService
                                 ) { }


  clearcard()
  {
    this.authService.authState.subscribe((user) => {
      if(user)
      {
        this.controlshopng.deletshopingcard(user.name).subscribe();
        this.comingquantaty.changeMessage(0);
      }
    });

  }
  ////////////
  minusclick(product:UserShopingCard)             
 {
  this.totalforonpro =  product.productquantay* product.price;
  this.total = this.total -this.totalforonpro; 

  product.productquantay = product.productquantay-1;
  this.prouctnewquantaty=product.productquantay;
  this.quantatyfromservice--; 
  this.comingquantaty.changeMessage(this.quantatyfromservice);

  this.total += product.productquantay* product.price;
  this.sendorder(product);
 }
 plusclick(product:UserShopingCard)
 {
   this.totalforonpro =  product.productquantay* product.price;
   this.total = this.total -this.totalforonpro;

  product.productquantay = product.productquantay+1;
  this.prouctnewquantaty=product.productquantay;
  this.quantatyfromservice++; 
  this.comingquantaty.changeMessage(this.quantatyfromservice);

  this.total += product.productquantay* product.price;
  this.sendorder(product);
 
 }
 sendorder(selectedpro)
 {
  this.authService.authState.subscribe((user) => {
    if (user) {
      this.userOrder =new UserShopingCard(  user.name,
                                            selectedpro.id,
                                            selectedpro.name,
                                            this.prouctnewquantaty,
                                            selectedpro.price,
                                            selectedpro.category,
                                            selectedpro.imgurl);

      
       this.sendorderservice.senduserorder(this.userOrder).subscribe(
         (en)=>{console.log(en)}
       );
    }
  });

}
  //////////////
  ngOnInit(): void {
    this.comingquantaty.currentMessage.subscribe(message => this.quantatyfromservice = message);
    this.authService.authState.subscribe((user) => {
      if(user)
      {
        this.controlshopng.getAllShopingproduct().subscribe((datad) => {
          this.shopinglist = datad;
          for(var i in datad)
          {
            if(datad[i].productquantay > 0 && datad[i].username == user.name)
            {
              this.total += datad[i].productquantay * datad[i].price;
            }
          }
        });

      }
    });


  }

}
