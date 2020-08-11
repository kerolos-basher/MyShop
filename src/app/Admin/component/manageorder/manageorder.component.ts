import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SetDonrUserService } from 'src/app/userShoping/userService/set-donr-user.service';
import { Doneuser } from 'src/app/userShoping/userViwModels/doneuser';

@Component({
  selector: 'app-manageorder',
  templateUrl: './manageorder.component.html',
  styleUrls: ['./manageorder.component.scss']
})
export class ManageorderComponent implements OnInit {

  constructor( private authService: AuthService ,private shopingspiservise:SetDonrUserService) { }
  alluserorder:Doneuser[];
  ngOnInit(): void {
  
      this.authService.authState.subscribe((user) => {
        if(user)
        {
          this.shopingspiservise.getAllDoneUser().subscribe(
            (data)=>{
              this.alluserorder = data;
            }
          );
        }
      });
    
  }

}
