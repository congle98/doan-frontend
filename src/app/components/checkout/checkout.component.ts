import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {City} from "../../common/City";
import {ShopService} from "../../services/shop.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {AppValidators} from "../../validators/AppValidators";
import {Order} from "../../common/Order";
import {OrderItem} from "../../common/OrderItem";
import {Purchase} from "../../common/Purchase";
import {Customer} from "../../common/Customer";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2';
import {AlertService} from "../../services/alert.service";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  cities: City[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder,
              private shopService: ShopService,
              private cartService: CartService,
              private authService: AuthService,
              private checkoutService: CheckoutService,
              private router: Router,
              private alertService:AlertService
  ) {
  }

  get fullName() {
    return this.checkoutFormGroup.get("fullName");
  }

  get email() {
    return this.checkoutFormGroup.get("email");
  }

  get phone() {
    return this.checkoutFormGroup.get("phone");
  }

  get city() {
    return this.checkoutFormGroup.get("city");
  }

  get addressDetail() {
    return this.checkoutFormGroup.get("addressDetail");
  }

  ngOnInit(): void {
    this.reviewCartDetail();
    this.builderForm();
    this.shopService.getCities().subscribe(data => {
      this.cities = data;
    })
  }

  builderForm() {
    let fullName = "";
    let email = "";
    let phone = "";
    if (this.authService.isLoggedIn()) {
      let user = this.authService.getUser();
      console.log(user);
      fullName = user.fullName;
      email = user.email;
      phone = user.phone;
    }
    this.checkoutFormGroup = this.formBuilder.group({
        fullName: new FormControl(
          fullName, [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
        email: new FormControl(
          email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        phone: new FormControl(
          phone, [Validators.required, Validators.pattern("^(84|0[3|5|7|8|9])+([0-9]{8})$")]),
        city: new FormControl(
          "", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
        addressDetail: new FormControl(
          "", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace])
      }
    )
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    if (this.totalQuantity === 0) {
      this.alertService.alertFail("Chưa có sản phẩm nào trong giỏ hàng")
      return;
    }
    let order: Order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    const cartItems = this.cartService.cartItems;
    let orderItemsShort: OrderItem[] = cartItems.map(item => new OrderItem(item));

    let purchase = new Purchase();
    let customer = new Customer()
    customer.email = this.checkoutFormGroup.controls["email"].value;
    order.city = this.checkoutFormGroup.controls['city'].value;
    order.customerEmail = this.checkoutFormGroup.controls["email"].value;
    order.customerName = this.checkoutFormGroup.controls["fullName"].value;
    order.customerPhone = this.checkoutFormGroup.controls["phone"].value;
    order.addressDetail = this.checkoutFormGroup.controls["addressDetail"].value;

    purchase.order = order;
    purchase.customer = customer;
    purchase.orderItems = orderItemsShort;
    this.checkoutService.placeOrder(purchase).subscribe(data => {
        this.alertService.alertSuccess("Bạn đã đặt hàng thành công, quản trị viên sẽ liên lạc với bạn để xác nhận đơn hàng!");
        this.resetCart();
      },
      error => alert(error.message));
  }

  private reviewCartDetail() {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
  }

  private resetCart() {
    this.cartService.removeCartItem();
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/products");
  }
}
