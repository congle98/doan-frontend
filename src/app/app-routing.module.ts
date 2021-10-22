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
      }
    ]
  },
  {
    path:"admin",component:AdminPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
