import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SetDonrUserService } from '../../userService/set-donr-user.service';
import { Doneuser } from '../../userViwModels/doneuser';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss']
})
export class MyorderComponent implements OnInit {
  alluserorder:Doneuser[]=[];
  constructor( private authService: AuthService ,private shopingspiservise:SetDonrUserService) { }

  ngOnInit(): void {
  
      this.authService.authState.subscribe((user) => {
        if(user)
        {
          this.shopingspiservise.getAllDoneUser().subscribe(
            (data)=>{
            for(var i in data)
            {
             if(data[i].username == user.name)
             {
              this.alluserorder.push(data[i]);
             }
            }
            }
          );
        }
      });
    
  }

}
