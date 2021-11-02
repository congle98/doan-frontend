import { Component, OnInit } from '@angular/core';
import {Book} from "../../common/Book";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {BookService, GetResponseBooks} from "../../services/book.service";
import {CartItem} from "../../common/CartItem";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 0;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  thePageNumber:number = 1;
  thePageSize:number = 12;
  theTotalElements: number = 0;
  previousKeyWord: string|null;
  constructor(private bookService:BookService,private route:ActivatedRoute,
              private cartService:CartService) { }

  ngOnInit(): void {
    //theo dõi thay đổi của url
    this.route.paramMap.subscribe(()=>{
      this.getProductList()
    })
  }

  getProductList(){
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    let theKeyword = this.route.snapshot.paramMap.get("keyword")
    if(this.previousKeyWord != theKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyWord = theKeyword;
    this.bookService.searchBooks(this.thePageNumber-1,
      this.thePageSize,theKeyword?theKeyword:"").subscribe(data => this.processResult(data))
  }

  handleListProducts(){
    const  hasCategoryId:boolean = this.route.snapshot.paramMap.has("id");

    if(hasCategoryId){
      // @ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id");
    }

    //tránh trường hợp nhảy sang category khác vẫn giữ nguyên page đang đứng :v
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    //phân trang bootstrap nó bắt đầu từ 1. mà pageable bắt đầu từ 0 nên phải tăng giảm 1 đơn vị
    this.bookService.getBookListPaginate(
      this.thePageNumber-1,
      this.thePageSize,
      this.currentCategoryId).subscribe(data => this.processResult(data));
  }
  processResult(data:GetResponseBooks){
    this.books = data.content;
    this.thePageNumber = data.number+1;
    this.thePageSize = data.size;
    this.theTotalElements = data.totalElements;

  }
  updatePageSize(event:any){
    const pageSize = event.target.value;
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.getProductList();
  }
  //
  addToCart(book:Book){
    const cartItem:CartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }

}
