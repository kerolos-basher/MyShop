import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetProductService } from 'src/app/shairdService/get-product.service';
import { ProductControlService } from '../../adminService/product-control.service';
import { ProductInfo } from 'src/app/ShairdViewModels/product-info';
import { Categores } from 'src/app/ShairdViewModels/categores';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  selectedpro:ProductInfo;
  catlist:Categores[];
  constructor(private activeroot:ActivatedRoute,private controlproductservice:ProductControlService,private getcategoryservice:GetProductService) 
  {this.selectedpro = new ProductInfo(0,'',0,'','',''); }


  deletpro()
  {
    this.controlproductservice.deletproduct(this.selectedpro.id).subscribe(
      (en)=>console.log(en)
    );
  }
  update()
  {
    this.controlproductservice.updateproduct(this.selectedpro).subscribe(
      (an)=>{console.log(an)}
    );
  }
  ngOnInit(): void {
    const selcnamefromlink = this.activeroot.snapshot.params['name'];
    this.controlproductservice.getproductbyname(selcnamefromlink).subscribe(
      (data)=>{
          this.selectedpro = data;
          console.log(this.selectedpro); 
      }
    );
    this.getcategoryservice.getAllcategories().subscribe(
      (data)=>{this.catlist = data}
   );
     
  }

}
