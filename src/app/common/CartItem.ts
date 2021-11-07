import {Book} from "./Book";

export class CartItem {
  id: number;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity:number;

  constructor(book:Book) {
    this.id = book.id;
    this.name = book.name;
    this.imageUrl = book.imageUrl;
    this.unitPrice = book.price - book.salePrice;
    this.quantity = 1;
  }
}
