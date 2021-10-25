import {Component, OnDestroy, OnInit} from '@angular/core';
import {GetResponseOrders, OrderService} from "../../services/order.service";
import {Order} from "../../common/Order";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {OrderItem} from "../../common/OrderItem";
import {ListOrderItemComponent} from "../../common/dialog/list-order-item/list-order-item.component";
import {Message} from 'primeng//api';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef;
  orders:Order[]=[];
  customerId:number;
  constructor(private orderService: OrderService,
              private authService:AuthService,
              private router:Router,
              public dialogService: DialogService,
              public messageService: MessageService) { }

  ngOnInit(): void {
    this.customerId = this.authService.getUser().id;
    this.handleListOrder();
    this.authService.loginStatusSubject.subscribe(isLogin => {
      if(!isLogin) {
        this.orders = [];
        this.router.navigateByUrl("");
      }
    })
  }

  show(data:OrderItem[]) {
    this.ref = this.dialogService.open(ListOrderItemComponent, {
      header: 'Chi tiết đơn hàng',
      width: '50%',
      contentStyle: {"max-height": "500px", "overflow": "order"},
      baseZIndex: 10000,
      data: data
    });
  }

  handleListOrder(){
    this.orderService.getAllOrdersByCustomer(
      this.customerId,
      ).subscribe(data => this.orders = data);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  changeOrderStatus(order:Order){
    let statusId;
    if(order.status.id===1){
      statusId = 4;
    }
    else {
      statusId = 3;
    }
    // @ts-ignore
    this.orderService.changeOrderStatus(order.id,statusId).subscribe(success => {
      this.orders = this.orders.map(item => {
        if(item.id === order.id){
          item = success
        }
        console.log(success);
        return item;
      })
    })
  }

}
