import { Component, OnInit } from '@angular/core';
import {Book} from "../../common/Book";
import {BookService} from "../../services/book.service";
import {CartItem} from "../../common/CartItem";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-top-sold',
  templateUrl: './top-sold.component.html',
  styleUrls: ['./top-sold.component.css']
})
export class TopSoldComponent implements OnInit {
  Books: Book[];
  hour = 1;
  minute = 59;
  second =59;
  responsiveOptions:any;
  constructor(private bookService:BookService,
              private cartService:CartService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.getAllTopSold();
    this.setTime();
  }
  getAllTopSold(){
    this.bookService.getAllTopSale().subscribe(books => this.Books = books);
  }
  setTime(){
    setInterval(() => {
      if(this.hour == 0){
        this.hour = 2
      }
      this.hour -=1;
    }, 3600000);
    setInterval(() => {
      if(this.minute == 0){
        this.minute = 60
      }
      this.minute -=1;
    }, 60000);
    setInterval(() => {
      if(this.second == 0){
        this.second = 60
      }
      this.second -=1;
    }, 1000);
  }
  addToCart(book:Book){
    const cartItem:CartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }
}
