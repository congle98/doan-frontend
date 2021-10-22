import {Author} from "./Author";
import {Image} from "./Image";
import {BookCategory} from "./BookCategory";

export class Book {
  id:number;
  name: string;
  description: string;
  price: number;
  salePrice:number;
  active:boolean;
  dateCreated: Date;
  lastUpdated: Date;
  author: Author;
  images: Image[];
  bookCategory: BookCategory;
}
