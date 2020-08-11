import { Injectable } from '@angular/core';
import { Doneuser } from '../userViwModels/doneuser';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetDonrUserService {

  constructor(private httpclientmodule:HttpClient) { }
  insertdoneuser(nwedoneuser: Doneuser):Observable<any>{
    {
      const httpOptions = {headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Accept':' */*'
         //,'Authorization': 'my-auth-token'  
        })}; 
      
      return this.httpclientmodule.post<any>(`${environment.API_URL}insertdonuser`,nwedoneuser,httpOptions);
    }

  }
  getAllDoneUser():Observable<Doneuser[]>
  {
    return this.httpclientmodule.get<Doneuser[]>(`${environment.API_URL}getallsdoneuser`);
  }

}
