import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Subject} from "rxjs";
import {User} from "../common/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = environment.baseUrl+"/auth";
  loginStatusSubject = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  constructor(private httpClient:HttpClient) { }


  login(username:string, password: string){
    let loginForm = {
      username,
      password
    }
    return this.httpClient.post(this.url+"/login",loginForm);
  }
  loginSuccess(user:any){
    localStorage.setItem("user",JSON.stringify(user));
    this.loginStatusSubject.next(true);
    if(user.role.name=="ADMIN"){
      this.isAdmin.next(true)
    }
    else {
      this.isAdmin.next(false);
    }
  }


  logOut(){
    localStorage.removeItem("user");
    this.loginStatusSubject.next(false);
    this.isAdmin.next(false);
  }
  isLoggedAdmin(){
    let user = JSON.parse(<string>localStorage.getItem('user'));
    if(user&&user.role.name=="ADMIN"){
      return true;
    }
    else{
      return false;
    }
  }
  getUser():User{
    let user:User = JSON.parse(<string>localStorage.getItem("user"));
    return user;
  }
  isLoggedIn(){
    let user = localStorage.getItem('user');
    if(!user){
      return false
    }
    else{
      return true;
    }
  }

}

