import { Component, OnInit } from '@angular/core';
import {Order} from "../../common/Order";
import {Book} from "../../common/Book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.css']
})
export class BooksManagerComponent implements OnInit {
  books: Book[] = [];
  bookDialog: boolean;

  book: Book;

  selectedBooks: Book[];

  submitted: boolean;

  statuses: any[];
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.getAllByAdmin();
  }

  getAllByAdmin(){
    this.bookService.getAllByAdmin().subscribe(data =>{
      this.books = data;
    })
  }
  changeBookStatus(id:number){
    this.bookService.changeBookStatus(id).subscribe(book =>{
      this.books = this.books.map(item =>{
        if(item.id == id){
          item.active = !item.active;
        }
        return item;
      })
    })
  }
  openNew(){
    this.book = new Book();
    this.submitted = false;
    this.bookDialog = true;
  }
  deleteSelectedProducts(){

  }
  hideDialog() {
    this.bookDialog = false;
    this.submitted = false;
  }
  saveProduct(){

  }
  editProduct(book: Book) {
    this.book = {...book};
    this.bookDialog = true;
  }

  deleteProduct(book: Book) {

  }
}
