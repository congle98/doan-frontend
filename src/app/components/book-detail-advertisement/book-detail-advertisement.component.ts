import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../common/Book";
import {BookService} from "../../services/book.service";
import {CartItem} from "../../common/CartItem";
import {CartService} from "../../services/cart.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-book-detail-advertisement',
  templateUrl: './book-detail-advertisement.component.html',
  styleUrls: ['./book-detail-advertisement.component.css']
})
export class BookDetailAdvertisementComponent implements OnInit {
  @Input()booksOfCategory:Book[];
  @Input()booksOfAuthor:Book[];
  @Input()book:Book;
  responsiveOptions:any;
  constructor(private bookService:BookService,
              private router:Router,
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
        numVisible: 2,
        numScroll: 2
      }
    ];
  }

  ngOnInit(): void {
  }
  addToCart(book:Book){
    const cartItem:CartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }
  navigateBookDetail(bookId:number){
    this.router.navigateByUrl("/book-detail/"+bookId);
    window.scrollTo(0, 0);

  }

}
