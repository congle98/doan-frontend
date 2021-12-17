import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Book} from "../../common/Book";
import {Order} from "../../common/Order";
import {AlertService} from "../../services/alert.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  orders: Order[] = [];
  orderDialog: boolean;
  orderSelect: Order;
  constructor(private orderService:OrderService,
              private alertService:AlertService,
              ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }


  hideDialog() {
    this.orderDialog = false;
  }
  detail(order: Order) {
    this.orderSelect = {...order};
    this.orderDialog = true;
  }
  changeStatus(order:Order,statusId:number){
        // @ts-ignore
    this.orderService.changeOrderStatus(order.id,statusId).subscribe(data =>{
      this.orders = this.orders.map(item =>{
        if(item.id == data.id){
          item = data
        }
        return item
      })
      this.alertService.alertUpdateSuccess();
    },error => this.alertService.alertFail(error.error.message))
  }
  getAllOrders(){
    this.orderService.getAllOrders(0).subscribe(data => this.orders = data);
  }
}
