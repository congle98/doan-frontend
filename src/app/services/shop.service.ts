import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "../common/City";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  urlCity:string = environment.baseUrl+"/cities";
  constructor(private httpClient:HttpClient) { };

  getCities():Observable<City[]>{
    return this.httpClient.get<City[]>(this.urlCity);
  }
}
