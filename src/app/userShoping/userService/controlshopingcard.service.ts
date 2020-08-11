import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserShopingCard } from '../userViwModels/user-shoping-card';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlshopingcardService {

  constructor(private httpclientmodule:HttpClient) { }
  getAllShopingproduct():Observable<UserShopingCard[]>
  {
    return this.httpclientmodule.get<UserShopingCard[]>(`${environment.API_URL}getallshopingcard`);
  }

  deletshopingcard(username:string):Observable<any[]>
  {
    return this.httpclientmodule.get<any[]>(`${environment.API_URL}cleareusercard/${username}`);
  }
}
