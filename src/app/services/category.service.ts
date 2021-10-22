import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookCategory} from "../common/BookCategory";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string = environment.baseUrl;
  constructor(private httpClient:HttpClient) { }

  getProductCategories():Observable<BookCategory[]>{
    return this.httpClient.get<BookCategory[]>(this.url+"/categories");
  }
}
