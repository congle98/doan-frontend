import { Component, OnInit } from '@angular/core';
import {Book} from "../../common/Book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  Books: Book[]
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(){
    this.bookService.getAllTopSold().subscribe(data => this.Books = data)
  }

}
