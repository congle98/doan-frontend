import { Component, OnInit } from '@angular/core';
import {OrderItem} from "../../OrderItem";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-list-order-item',
  templateUrl: './list-order-item.component.html',
  styleUrls: ['./list-order-item.component.css']
})
export class ListOrderItemComponent implements OnInit {

 orderItems: OrderItem[];

  constructor( public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.orderItems = this.config.data;
  }

  selectProduct(orderItem:OrderItem) {
    this.ref.close(orderItem);
  }
}
