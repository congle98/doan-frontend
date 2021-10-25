import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../common/Book";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url:string = environment.baseUrl;
  constructor(private httpClient:HttpClient) {
  }
  getBookListPaginate(thePage:number,thePageSize:number,id:number):Observable<GetResponseBooks>{
    const searchUrl = this.url+"/books/findAllActive?id=";
    return this.httpClient.get<GetResponseBooks>(`${searchUrl+id}&page=${thePage}&size=${thePageSize}`);
  }
  searchBooks(thePage:number,thePageSize:number,keyWord:string=""):Observable<GetResponseBooks>{
    const searchUrl = this.url+"/books/search/findByContextContaining?context="
    return this.httpClient.get<GetResponseBooks>(`${searchUrl+keyWord}&page=${thePage}&size=${thePageSize}`);
  }
  getAllByAdmin():Observable<Book[]>{
    let url = this.url+"/books";
    return this.httpClient.get<Book[]>(url);
  }
  changeBookStatus(id:number):Observable<Book>{
    let url = this.url+"/books";
    return this.httpClient.put<Book>(url,id);
  }
  //
  // getBook(theProductId: number):Observable<Book> {
  //   const searchUrl = this.url+"/products/"
  //   return this.httpClient.get<Book>(searchUrl+theProductId)
  // }
}
export interface GetResponseBooks{
  content:Book[],
  size:number,
  totalElements:number,
  totalPages:number,
  number:number
}
//
// interface GetResponseCategories{
//   _embedded:{
//     productCategory:ProductCategory[]
//   }
// }
// }
