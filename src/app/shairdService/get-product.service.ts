import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductInfo } from '../ShairdViewModels/product-info';
import { Categores } from '../ShairdViewModels/categores';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  constructor(private httpclientmodule:HttpClient) { }
  
  getAllproducts():Observable<ProductInfo[]>
  {
    return this.httpclientmodule.get<ProductInfo[]>(`${environment.API_URL}getallproducts`);
  }
  getAllcategories():Observable<Categores[]>
  {
    return this.httpclientmodule.get<Categores[]>(`${environment.API_URL}getcategories`);
  }
}
