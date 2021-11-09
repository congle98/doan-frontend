import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";
import {ProfileComponent} from "../profile/profile.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {User} from "../../common/User";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  user: User|undefined;
  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    if(this.isAuthenticated){
      this.user = this.authService.getUser();
    }
    this.authService.loginStatusSubject.subscribe(isLogin =>{
      this.isAuthenticated = isLogin;
      if(isLogin === true){
        this.user = this.authService.getUser();
      }
      else {
        this.user=undefined;
      }
    })
    // this.authService.dialogSubject.subscribe(()=> this.closeDialog());
    // this.authService.loginRegisterSubject.subscribe(string => {
    //   if(string == 'dn'){
    //     this.closeDialog()
    //     this.showLoginDialog()
    //   }
    //   else if (string == 'dk') {
    //     this.closeDialog()
    //     this.showRegisterDialog()
    //   }
    //   else if (string == 'mk') {
    //     this.closeDialog()
    //     this.showReSetPasswordDialog()
    //   }
    // })
  }
  showLoginDialog(){
    this.dialog.closeAll();
    this.dialog.open(LoginComponent);
  }
  showRegisterDialog(){
    this.dialog.closeAll();
    this.dialog.open(RegisterComponent);
  }
  showProfileDialog(){
    this.dialog.open(ProfileComponent);
  }
  // closeDialog(){
  //   this.dialog.closeAll();
  // }
  // showReSetPasswordDialog(){
  //   this.dialog.open(ResetPasswordComponent);
  // }
  logOut(){
    this.authService.logOut();
  }

}
