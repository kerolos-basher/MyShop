import { Component, OnInit } from '@angular/core';
import { GetProductService } from 'src/app/shairdService/get-product.service';
import { ProductInfo } from 'src/app/ShairdViewModels/product-info';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myhome',
  templateUrl: './myhome.component.html',
  styleUrls: ['./myhome.component.scss']
})
export class MyhomeComponent implements OnInit {
allproducts:ProductInfo[];
filterproduct:ProductInfo[];
catlap="lap";
catmobile="mobile";
cattap="tap";
catscreen="screen";
categoryy:string;
  constructor(private GETPRODUCRSERVICE:GetProductService,private root: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.GETPRODUCRSERVICE.getAllproducts().subscribe(
      (data)=>{
        this.allproducts = data
        this.root.queryParamMap.subscribe(params => {
          this.categoryy = params.get('categoryy');
          this.filterproduct = (this.categoryy) ?
            this.allproducts.filter(p => p.category == this.categoryy) :
            this.allproducts;
        });
      }
    );
  }

}
