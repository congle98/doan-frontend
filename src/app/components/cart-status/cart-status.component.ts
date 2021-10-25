import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/CartItem";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  cartItems: CartItem[] = [];

  selectedItem: CartItem;
  totalPrice:number = 0;
  totalQuantity:number = 0;
  constructor(private cartService:CartService, private messageService: MessageService ) { }

  ngOnInit(): void {
    this.updateCartStatus();
    this.cartItems = this.cartService.cartItems;
  }

  updateCartStatus(){
    this.cartService.totalQuantity.subscribe((data)=>{
      this.totalQuantity = data;
    });
    this.cartService.totalPrice.subscribe((data)=>{
      this.totalPrice = data;
    })
  }
  onRowSelect(event:any) {
    this.messageService.add({severity: 'info', summary: 'Product Selected', detail: event.data.name});
  }


}
