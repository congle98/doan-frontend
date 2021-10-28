import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../common/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;
  admin:User|null;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedAdmin();
    if(this.isAuthenticated ){
      this.admin = this.authService.getUser();
    }
    this.authService.isAdmin.subscribe(isLogin =>{
      this.isAuthenticated = isLogin;
      if(isLogin === true){
        this.admin = this.authService.getUser();
      }
      else {
        this.admin = null;
      }
    })
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl("/admin-login");
  }

}
