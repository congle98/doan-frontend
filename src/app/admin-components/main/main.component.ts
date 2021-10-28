import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  totalPrice:number = 0;
  totalQuantity:number = 0;
  totalOrders:number = 0;
  totalOrderCompleted:number = 0;
  totalOrderCancelled:number = 0;
  data:any;
  totalUsers:number = 0;
  constructor(private orderService:OrderService, private  usersService:UsersService) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.getAllUser();
  }
  getAllOrders(){
    this.orderService.getAllOrders(0).subscribe(data =>{
      this.totalOrders = data.length;
      data.map(item =>{
        if(item.status.id==4){
          this.totalOrderCancelled +=1;
        }
        else if(item.status.id==3){
          this.totalPrice += item.totalPrice;
          this.totalQuantity += item.totalQuantity;
          this.totalOrderCompleted +=1;
        }
      })
      this.getData();
    })
  }
  getAllUser(){
    this.usersService.findAllUsers().subscribe(data => this.totalUsers = data.length);
  }
  getData(){
  this.data =  {
    labels: ['Đã hủy','Đã bán','Tổng số đơn'],
    datasets: [
      {
        data: [this.totalOrderCancelled, this.totalOrderCompleted, this.totalOrders],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }
    ]
  };
  }

}
