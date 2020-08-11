import { Injectable } from '@angular/core';
import { UserShopingCard } from '../userViwModels/user-shoping-card';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendUserShopingService {

  constructor(private httpclientmodule:HttpClient) { }
  senduserorder(newShopingOrder : UserShopingCard):Observable<any>{
    {
      const httpOptions = {headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Accept':' */*'
         //,'Authorization': 'my-auth-token'  
        })}; 
      
      return this.httpclientmodule.post<any>(`${environment.API_URL}insertorupdateusershopingcard`,newShopingOrder,httpOptions);
    }
  }
}
