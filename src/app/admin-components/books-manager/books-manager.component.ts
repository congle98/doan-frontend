import { Component, OnInit } from '@angular/core';
import {Order} from "../../common/Order";
import {Book} from "../../common/Book";
import {BookService} from "../../services/book.service";
import {AuthorService} from "../../services/author.service";
import {Author} from "../../common/Author";
import {BookCategory} from "../../common/BookCategory";
import {CategoryService} from "../../services/category.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppValidators} from "../../validators/AppValidators";
import {B} from "@angular/cdk/keycodes";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.css']
})
export class BooksManagerComponent implements OnInit {
  books: Book[] = [];
  bookDialog: boolean;
  authors: Author[] = [];
  categories: BookCategory[] = [];
  bookForm: FormGroup;
  isEdit = false;
  selectedBooks: Book[];
  imageFile:any;
  imageUrl:string;
  constructor(private storage:AngularFireStorage,
              private formBuilder:FormBuilder,
              private bookService:BookService,
              private authorService:AuthorService,
              private categoryService: CategoryService,
              private alertService:AlertService) { }

  ngOnInit(): void {
    this.getAllByAdmin();
    this.getAllAuthors();
    this.getAllCategory();
  }
  getAllByAdmin(){
    this.bookService.getAllByAdmin().subscribe(data =>{
      this.books = data;
    })
  }
  openNew(){
    this.bookForm = this.formBuilder.group({
      name: new FormControl(
        "", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      description: new FormControl(
        "", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      price: new FormControl(
        "", [Validators.required]),
      salePrice: new FormControl(
        "", [Validators.required]),
      author: new FormControl(
        "", [Validators.required, Validators.minLength(2)]),
      bookCategory: new FormControl(
        "", [Validators.required, Validators.minLength(2)]),
    })
    this.bookDialog = true;
    this.isEdit = false;
  }
  get name(){
    return this.bookForm.get("name");
  }
  get description(){
    return this.bookForm.get("description");
  }
  get salePrice(){
    return this.bookForm.get("salePrice");
  }
  get price(){
    return this.bookForm.get("price");
  }
  get author(){
    return this.bookForm.get("author");
  }
  get bookCategory(){
    return this.bookForm.get("bookCategory");
  }

  deleteSelectedProducts(){

  }
  hideDialog() {
    this.bookDialog = false;
    this.imageUrl = "";
    this.imageFile = null;
  }
  saveBookToBackend(){
    let book:Book = new Book();
    let subscribe;
    book.name = this.bookForm.controls["name"].value;
    book.description = this.bookForm.controls["description"].value;
    book.price = this.bookForm.controls["price"].value;
    book.salePrice = this.bookForm.controls["salePrice"].value;
    book.author = this.bookForm.controls["author"].value;
    book.bookCategory = this.bookForm.controls["bookCategory"].value;
    book.imageUrl = this.imageUrl;
    if(this.isEdit){
      book.id = this.bookForm.controls["id"].value;
      book.active = this.bookForm.controls["active"].value;
      book.dateCreated = this.bookForm.controls["dateCreated"].value;
      book.lastUpdated = this.bookForm.controls["lastUpdated"].value;
      subscribe = this.bookService.updateBook(book);
    }
    else {
      subscribe = this.bookService.saveBook(book);
    }
    console.log(book);
    subscribe.subscribe(data =>{
      if(this.isEdit){
        this.books = this.books.map(item =>{
          if(item.id == data.id){
            item = data;
          }
          return item;
        })
      }
      else {
        this.books.push(data);
      }
    })
  }
  editBook(book: Book) {
    let name = book.name;
    let id = book.id;
    let description = book.description;
    let price = book.price;
    let salePrice = book.salePrice;
    let active = book.active;
    let dateCreated = book.dateCreated;
    let lastUpdated = book.lastUpdated;
    let author = book.author;
    let bookCategory = book.bookCategory;
    this.imageUrl = book.imageUrl;
    this.bookForm = this.formBuilder.group({
      id: new FormControl(
        id, [Validators.required]),
      name: new FormControl(
        name, [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      description: new FormControl(
        description, [Validators.required, Validators.minLength(2),AppValidators.notOnlyWhitespace]),
      price: new FormControl(
        price, [Validators.required]),
      salePrice: new FormControl(
        salePrice, [Validators.required]),
      active: new FormControl(
        active, [Validators.required, Validators.minLength(2)]),
      dateCreated: new FormControl(
        dateCreated, [Validators.required, Validators.minLength(2)]),
      lastUpdated: new FormControl(
        lastUpdated, [Validators.required, Validators.minLength(2)]),
      author: new FormControl(
        author, [Validators.required, Validators.minLength(2)]),
      bookCategory: new FormControl(
        bookCategory, [Validators.required, Validators.minLength(2)]),

    })
    this.bookDialog = true;
    this.isEdit = true;
  }

  changeActive(book: Book) {
    this.bookService.changeBookStatus(book.id).subscribe(data =>{
      this.books = this.books.map(item =>{
        if(item.id == data.id){
          item = data;
        }
        return item;
      })
    })
    this.alertService.alertUpdateSuccess();
  }
  getAllAuthors(){
    this.authorService.getAllActive().subscribe(data => this.authors = data);
  }
  getAllCategory(){
    this.categoryService.getProductCategories().subscribe(data => this.categories = data);
  }


  setAvatar(event:any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) =>  this.imageUrl = e.target.result;
      this.imageFile = event.target.files[0];


    } else {
      this.imageUrl = "";
    }
  }
  saveBook(){
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }
    if (this.imageFile) {
      const filePath = `${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
       this.storage.upload(filePath, this.imageFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imageUrl = url;
            this.saveBookToBackend();
            this.alertService.alertUpdateSuccess();
          });
        })).subscribe();
    }
    else {
      this.saveBookToBackend();
    }

    this.hideDialog();
  }

}
