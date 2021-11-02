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

  url:string = environment.baseUrl+"/books";
  constructor(private httpClient:HttpClient) {
  }
  getBookListPaginate(thePage:number,thePageSize:number,id:number):Observable<GetResponseBooks>{
    const searchUrl = this.url+"/findAllActive?id=";
    return this.httpClient.get<GetResponseBooks>(`${searchUrl+id}&page=${thePage}&size=${thePageSize}`);
  }
  searchBooks(thePage:number,thePageSize:number,keyWord:string=""):Observable<GetResponseBooks>{
    const searchUrl = this.url+"/search/findByContextContaining?context="
    return this.httpClient.get<GetResponseBooks>(`${searchUrl+keyWord}&page=${thePage}&size=${thePageSize}`);
  }
  getAllByAdmin():Observable<Book[]>{
    return this.httpClient.get<Book[]>(this.url);
  }
  changeBookStatus(id:number):Observable<Book>{
    return this.httpClient.put<Book>(this.url+"/change-status",id);
  }
  saveBook(book:Book):Observable<Book>{
    return this.httpClient.post<Book>(this.url,book);
  }
  updateBook(book:Book):Observable<Book>{
    return this.httpClient.put<Book>(this.url,book);
  }

  getAllTopSale():Observable<Book[]>{
    return this.httpClient.get<Book[]>(this.url+"/top-sale");
  }

  getAllTopSold():Observable<Book[]>{
    return this.httpClient.get<Book[]>(this.url+"/top-sold");
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
