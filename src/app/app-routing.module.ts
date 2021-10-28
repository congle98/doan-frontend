import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopPageComponent} from "./components/shop-page/shop-page.component";
import {AdminPageComponent} from "./admin-components/admin-page/admin-page.component";
import {BookListComponent} from "./components/book-list/book-list.component";
import {BookDetailComponent} from "./components/book-detail/book-detail.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {CartDetailComponent} from "./components/cart-detail/cart-detail.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {OrderHistoryComponent} from "./components/order-history/order-history.component";
import {CustomerGuard} from "./guard/customer.guard";
import {MainComponent} from "./admin-components/main/main.component";
import {ListCustomerComponent} from "./admin-components/customer-manager/list-customer.component";
import {ListOrderComponent} from "./admin-components/order-manager/list-order.component";
import {BooksManagerComponent} from "./admin-components/books-manager/books-manager.component";
import {AuthorManagerComponent} from "./admin-components/author-manager/author-manager.component";
import {AdminGuard} from "./guard/admin.guard";
import {LoginAdminComponent} from "./admin-components/login/login.component";

const routes: Routes = [
  {
    path: "", component:ShopPageComponent,
    children: [
      {
        path:"", redirectTo:"/books", pathMatch:"full"
      },
      {
       path:"login", component:LoginComponent
      },
      {
        path:"register", component:RegisterComponent
      },
      {
        path:"books/:id", component:BookDetailComponent
      },
      {
        path:"category/:id", component:BookListComponent
      },
      {
        path:"author/:id", component:BookListComponent
      },
      {
        path:"books", component:BookListComponent
      },
      {
        path:"category", component:BookListComponent
      },
      {
        path:"author", component:BookListComponent
      },
      {
        path:'search/:keyword', component:BookListComponent
      },
      {
        path:"checkout", component:CheckoutComponent
      },
      {
        path:"cart-details", component:CartDetailComponent
      },
      {
        path:"order-history", component:OrderHistoryComponent,
        canActivate:[CustomerGuard]
      }
    ]
  },
  {
    path: "admin-login",
    component: LoginAdminComponent
  },
  {
    path:"admin",component:AdminPageComponent,
    canActivate:[AdminGuard],
    children: [
      {
        path: "",
        redirectTo: "main-dashboard",
        pathMatch:"full"
      },
      {
        path: "main-dashboard",
        component: MainComponent
      },
      {
        path: "customer",
        component: ListCustomerComponent
      },
      {
        path: "orders",
        component: ListOrderComponent
      },
      {
        path: "books",
        component: BooksManagerComponent
      },
      {
        path:"author",
        component: AuthorManagerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
