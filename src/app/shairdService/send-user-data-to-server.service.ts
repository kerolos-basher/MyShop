import { Injectable } from '@angular/core';
import { UserLoginInfo } from '../ShairdViewModels/user-login-info';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendUserDataToServerService {

  constructor(private httpclientmodule:HttpClient) { }
  insertuser(nweuser : UserLoginInfo):Observable<any>{
    {
      const httpOptions = {headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Accept':' */*'
         //,'Authorization': 'my-auth-token'  
        })}; 
      
      return this.httpclientmodule.post<any>(`${environment.API_URL}insertuser`,nweuser,httpOptions);
    }
  }
}
