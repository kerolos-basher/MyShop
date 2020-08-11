import { Component, OnInit } from '@angular/core';
import { ProductInfo } from 'src/app/ShairdViewModels/product-info';
import { ProductControlService } from '../../adminService/product-control.service';
import { GetProductService } from 'src/app/shairdService/get-product.service';
import { Categores } from 'src/app/ShairdViewModels/categores';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  catlist:Categores[];
  seledcatname='sd';
  constructor(private getcategoryservice:GetProductService,private controlproservice:ProductControlService) {



   }
  save(id:number,name:string,price:number,categores:string,imgurl:string,about:string)
  {
    var obj = new ProductInfo(id,name,price,categores,imgurl,about);
    console.log(obj )
   this.controlproservice.addnewproduct(obj).subscribe()
   {
     (ev)=>{console.log(ev)}
   }
  }
  ngOnInit(): void {
    this.getcategoryservice.getAllcategories().subscribe(
      (data)=>{this.catlist = data}
   );
  }

}
