import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductService } from 'src/app/shairdService/get-product.service';
import { ProductControlService } from 'src/app/Admin/adminService/product-control.service';
import { ProductInfo } from 'src/app/ShairdViewModels/product-info';
import { AuthService } from 'angularx-social-login';
import { ShardShopingQuantatyService } from 'src/app/shairdService/shard-shoping-quantaty.service';
import { UserShopingCard } from '../../userViwModels/user-shoping-card';
import { SendUserShopingService } from '../../userService/send-user-shoping.service';
import { ControlshopingcardService } from '../../userService/controlshopingcard.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.scss']
})
export class ShowProductDetailsComponent implements OnInit {
  selectedpro: ProductInfo;
  quantaty = 0;
  userOrder:UserShopingCard;
  quantatyfromservice:number;
  userexisr = true;
  constructor(private activeroot: ActivatedRoute, private controlproductservice: ProductControlService,
    private authService: AuthService,private comingquantaty:ShardShopingQuantatyService,
    private sendorderservice:SendUserShopingService,private controlshopingproduct:ControlshopingcardService) {
    this.selectedpro = new ProductInfo(0, '', 0, '', '', '');
  }
  mainbutoonclick() {
    this.authService.authState.subscribe((user) => {
      if (!user) {
        alert("logain At First");
        this.quantaty = 0;
        this.userexisr = false;
        return;
      }
    });
    if (this.userexisr) {
      this.quantaty++;
      this.quantatyfromservice++;
      this.comingquantaty.changeMessage(this.quantatyfromservice);
      this.sendorder();
    }
    this.userexisr = true;
  }
  minusclick() {
    this.quantaty--;
    this.quantatyfromservice--;
    this.comingquantaty.changeMessage(this.quantatyfromservice);
    this.sendorder();
  }
  plusclick() {
    this.quantaty++;
    this.quantatyfromservice++;
    this.comingquantaty.changeMessage(this.quantatyfromservice);
    this.sendorder();
  }
  sendorder()
  {
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.userOrder =new UserShopingCard(user.name,
                                              this.selectedpro.id,
                                              this.selectedpro.name,
                                              this.quantaty,
                                              this.selectedpro.price,
                                              this.selectedpro.category,
                                              this.selectedpro.imgurl);

        
         this.sendorderservice.senduserorder(this.userOrder).subscribe(
           (en)=>{console.log(en)}
         );
      }
    });

  }
  ngOnInit(): void {
    this.comingquantaty.currentMessage.subscribe(message => this.quantatyfromservice = message)
    const selcnamefromlink = this.activeroot.snapshot.params['name'];
    this.controlproductservice.getproductbyname(selcnamefromlink).subscribe(
      (data) => {
        this.selectedpro = data;
      }
    );

    this.controlshopingproduct.getAllShopingproduct().subscribe(
      (data)=>{
        this.authService.authState.subscribe((user) => {
          if (user) {
            console.log(data);
            for(let i in data)
            {
              if(data[i].name == this.selectedpro.name && user.name == data[i].username)
              {
                this.quantaty = data[i].productquantay;
            
              

              }
            }
          }
        });
      }
    );
  }

}
