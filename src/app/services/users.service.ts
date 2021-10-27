import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../common/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = environment.baseUrl+"/users"
  constructor(private httpClient:HttpClient) { }

  findAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.url);
  }
  changeActive(userId:number):Observable<User>{
    return this.httpClient.put<User>(this.url+"/change-active",userId);
  }
}
