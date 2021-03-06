import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../common/Purchase";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private url = environment.baseUrl+"/checkout/purchase";
  constructor(private httpClient:HttpClient) { }

  placeOrder(purchase: Purchase):Observable<any>{
    return this.httpClient.post(this.url,purchase);
  }
}
