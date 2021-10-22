import {CartItem} from "./CartItem";
import {Book} from "./Book";

export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  book:Book;

  constructor(cartItem:CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.unitPrice = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.book = new Book();
    this.book.id = cartItem.id
  }

}
