import { GetProductService } from 'src/app/shairdService/get-product.service';
import { ProductInfo } from 'src/app/ShairdViewModels/product-info';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
productlist:ProductInfo[];

displayedColumns: string[] = ['id', 'name', 'price', 'category','imgurl'];
  dataSource ;
  constructor(private getallprooduct:GetProductService) { }
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  edit(obhect:ProductInfo)
  {
    console.log(obhect);
  }
  ngOnInit(): void {
    this.getallprooduct.getAllproducts().subscribe(
      (data)=>{
        this.productlist=data;
       
        this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      }
    );
  }

}
