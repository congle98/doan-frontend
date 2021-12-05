import {Author} from "./Author";
import {BookCategory} from "./BookCategory";

export class Book {
  id:number;
  name: string;
  description: string;
  price: number;
  salePrice:number;
  unitPrice:number;
  active:boolean;
  dateCreated: Date;
  lastUpdated: Date;
  author: Author;
  imageUrl: string;
  bookCategory: BookCategory;
  sold:number;
}
