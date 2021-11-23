import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../services/book.service";
import {Book} from "../../common/Book";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/CartItem";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id:number;
  book:Book;
  booksOfCategory:Book[];
  booksOfAuthor:Book[];
  constructor(private route:ActivatedRoute, private bookService:BookService, private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param =>{
    // @ts-ignore
    this.id = +param.get("id");
    this.bookService.getById(this.id).subscribe(book =>{
      this.book = book;
      this.bookService.finAllCategory(this.book.bookCategory.id).subscribe(data => this.booksOfCategory = data);
      this.bookService.findAllAuthor(this.book.author.id).subscribe(data => this.booksOfAuthor = data);
    });
  })
  }
  addToCart(book:Book){
    const cartItem:CartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }
}
