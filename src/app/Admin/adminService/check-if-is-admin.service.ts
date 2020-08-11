import { Injectable } from '@angular/core';
import { UserLoginInfo } from 'src/app/ShairdViewModels/user-login-info';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckIfIsAdminService {

  constructor(private httpclientmodule:HttpClient) { }
  checkadmin(user : UserLoginInfo):Observable<boolean>{
    {
      const httpOptions = {headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Accept':' */*'
         //,'Authorization': 'my-auth-token'  
        })}; 
      
      return this.httpclientmodule.post<boolean>(`${environment.API_URL}checkifisadmin`,user,httpOptions);
    }
  }
}
