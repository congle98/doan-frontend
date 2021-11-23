import { Component, OnInit } from '@angular/core';
import {Book} from "../../common/Book";
import {BookService} from "../../services/book.service";
import {CartItem} from "../../common/CartItem";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  Books: Book[]
  constructor(private bookService:BookService,
              private cartService:CartService
              ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(){
    this.bookService.getAllTopSold().subscribe(data => this.Books = data)
  }
  addToCart(book:Book){
    const cartItem:CartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }

}
