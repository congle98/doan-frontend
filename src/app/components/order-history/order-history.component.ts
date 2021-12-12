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
import {AlertService} from "../../services/alert.service";

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
              private alertService:AlertService,
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
      width: '500px',
      contentStyle: {"max-height": "700px", "overflow": "order"},
      baseZIndex: 10000,
      data: data
    });
  }

  handleListOrder(){
    this.orderService.getAllOrders(
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

        return item;
      })
      this.alertService.alertSuccess("Cập nhật thành công")
    },error => {this.alertService.alertFail(error.error.message)})
  }

}
