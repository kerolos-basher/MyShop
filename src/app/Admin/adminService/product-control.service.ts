import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductInfo } from 'src/app/ShairdViewModels/product-info';

@Injectable({
  providedIn: 'root'
})
export class ProductControlService {

  constructor(private httpclientmodule:HttpClient) { }
  
  
  getproductbyname(name:string):Observable<ProductInfo>
  {
    return this.httpclientmodule.get<ProductInfo>(`${environment.API_URL}getproductbyname/${name}`);
  }


  deletproduct(id:number):Observable<ProductInfo>
  {
    return this.httpclientmodule.get<ProductInfo>(`${environment.API_URL}deleteproduct/${id}`);
  }


  addnewproduct(addpro : ProductInfo):Observable<any>{
    {
      const httpOptions = {headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Accept':' */*'
         //,'Authorization': 'my-auth-token'  
        })}; 
      
      return this.httpclientmodule.post<any>(`${environment.API_URL}insertnaewproduct`,addpro,httpOptions);
    }
  }

  
  updateproduct(updatedproduct : ProductInfo):Observable<any>{
    {
      const httpOptions = {headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Accept':' */*'
         //,'Authorization': 'my-auth-token'  
        })}; 
      
      return this.httpclientmodule.post<any>(`${environment.API_URL}updateproduct`,updatedproduct,httpOptions);
    }
  }
}
