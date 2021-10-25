import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Book} from "../common/Book";
import {Order} from "../common/Order";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = environment.baseUrl+"/orders";
  constructor(private httpClient:HttpClient) { }

  getAllOrdersByCustomer(id:number):Observable<Order[]>{
    let url = this.url+"?id="
    return this.httpClient.get<Order[]>(`${url+id}`);
  }

  changeOrderStatus(orderId:number,statusId:number):Observable<Order>{
    let url = this.url + "/change-status/"
    return this.httpClient.put<Order>(`${url+orderId}`,statusId);
  }
}

export interface GetResponseOrders{
  content:Order[],
  size:number,
  totalElements:number,
  totalPages:number,
  number:number
}
