import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../common/Order";
import {Customer} from "../../common/Customer";
import {User} from "../../common/User";
import {UsersService} from "../../services/users.service";
import {AlertService} from "../../services/alert.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  users: User[] = [];
  userDialog: boolean;
  orderOfUser:Order[] = [];
  constructor(private usersService:UsersService, private alertService:AlertService, private orderService:OrderService, private authService:AuthService) { }

  ngOnInit(): void {
    this.findAllUsers();
  }
  findAllUsers(){
    this.usersService.findAllUsers().subscribe(data =>{
      this.users = data;
    })
  }
  changeActive(user:User){
    this.usersService.changeActive(user.id).subscribe(data =>{
      this.users = this.users.map(item =>{
        if (item.id == data.id){
          item = data
        }
        return item
      })
      if(!data.status && this.authService.getUser().id == data.id){
          this.authService.logOut();
          this.alertService.alertFail("Xin lỗi tài khoản của bạn đã bị khoá!!")
      }
      this.alertService.alertUpdateSuccess();
    })
  }
  detail(user:User){
    this.orderService.getAllOrders(user.id).subscribe(data => {
      this.orderOfUser = data;
      console.log(this.orderOfUser);
      this.userDialog = true;
    });
  }

  hideDialog() {
    this.userDialog = false;
  }
}
