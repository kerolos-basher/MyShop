import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";
 
@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  constructor(private authService: AuthService) { }
 
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

 
  signOut(): void {
    this.authService.signOut();
  }
}
