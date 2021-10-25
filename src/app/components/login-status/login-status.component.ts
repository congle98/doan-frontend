import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    if(this.isAuthenticated){
      this.userFullName = this.authService.getUser().fullName;
    }
    this.authService.loginStatusSubject.subscribe(isLogin =>{
      this.isAuthenticated = isLogin;
      if(isLogin === true){
        this.userFullName = this.authService.getUser().fullName;
      }
      else {
        this.userFullName = "";
      }
    })
  }

  logOut(){
    this.authService.logOut();
  }

}
