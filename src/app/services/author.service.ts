import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Author} from "../common/Author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  url = environment.baseUrl+"/authors"
  constructor(private httpClient:HttpClient) { }

  getAllAuthors():Observable<Author[]>{
      return this.httpClient.get<Author[]>(this.url);
  }
  saveAuthor(author:Author):Observable<Author>{
    return this.httpClient.post<Author>(this.url,author);
  }
  getAllActive():Observable<Author[]>{
    let url = this.url+"/findAllActive"
    return this.httpClient.get<Author[]>(url);
  }
  changeStatus(id:number):Observable<Author>{
    let url = this.url+"/change-status"
    return this.httpClient.put<Author>(url,id);
  }
}
