import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {BookCategory} from "../../common/BookCategory";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {ProfileComponent} from "../profile/profile.component";
import {User} from "../../common/User";

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.css']
})
export class SiderBarComponent implements OnInit {
  isAuthenticated: boolean = false;
  user: User|undefined;
  categories:BookCategory[];
  constructor(private authService: AuthService,
              private categoryService:CategoryService,
              private matDialog:MatDialog,
              private router:Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listProductCategories();

    this.isAuthenticated = this.authService.isLoggedIn();
    if(this.isAuthenticated){
      this.user = this.authService.getUser();
    }
    this.authService.loginStatusSubject.subscribe(isLogin =>{
      this.isAuthenticated = isLogin;
      if(isLogin === true){
        this.user= this.authService.getUser();
      }
      else {
        this.user = undefined;
      }
    })
    // this.authService.dialogSubject.subscribe(()=> this.closeDialog());
    // this.authService.loginRegisterSubject.subscribe(string => {
    //   if(string == "dn"){
    //     this.closeDialog()
    //     this.showLoginDialog()
    //   }
    //   else if(string == "dk") {
    //     this.closeDialog()
    //     this.showRegisterDialog()
    //   }
    // })
  }

  listProductCategories(){
    this.categoryService.getProductCategories().subscribe(categories => this.categories = categories);
  }

  bookCategory(categoryId:number){

    this.matDialog.closeAll();
    this.router.navigateByUrl("/category/"+categoryId);
    window.scrollTo(0, 650);
  }
  showLoginDialog(){
    this.dialog.closeAll();
    this.dialog.open(LoginComponent);
  }
  showRegisterDialog(){
    this.dialog.closeAll();
    this.dialog.open(RegisterComponent);
  }
  logOut(){
    this.authService.logOut();
  }

  showProfileDialog(){
    this.dialog.closeAll();
    this.dialog.open(ProfileComponent);
  }


}
