import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { AdminPageComponent } from './admin-components/admin-page/admin-page.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { SiderBarComponent } from './components/sider-bar/sider-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import {ListOrderItemComponent} from "./common/dialog/list-order-item/list-order-item.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {TabViewModule} from "primeng/tabview";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {OverlayPanelModule} from "primeng/overlaypanel";
import {RippleModule} from "primeng/ripple";
import { NavbarComponent } from './admin-components/navbar/navbar.component';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { MainComponent } from './admin-components/main/main.component';
import { ListCustomerComponent } from './admin-components/customer-manager/list-customer.component';
import { ListOrderComponent } from './admin-components/order-manager/list-order.component';
import { FooterComponent } from './admin-components/footer/footer.component';
import { BooksManagerComponent } from './admin-components/books-manager/books-manager.component';
import { AuthorManagerComponent } from './admin-components/author-manager/author-manager.component';
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {ChartModule} from "primeng/chart";
import {LoginAdminComponent} from "./admin-components/login/login.component";
import {CurrencyVndPipe} from "./common/pipe/CurrencyVndPipe";
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import {CarouselModule} from "primeng/carousel";
import { TopSoldComponent } from './components/top-sold/top-sold.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PaginatorModule} from "primeng/paginator";
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {PasswordModule} from "primeng/password";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { BookDetailAdvertisementComponent } from './components/book-detail-advertisement/book-detail-advertisement.component';



@NgModule({
  declarations: [
    CurrencyVndPipe,
    AppComponent,
    ShopPageComponent,
    AdminPageComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    BookDetailComponent,
    BookListComponent,
    CartStatusComponent,
    CartDetailComponent,
    SiderBarComponent,
    LoginStatusComponent,
    OrderHistoryComponent,
    ListOrderItemComponent,
    NavbarComponent,
    DashboardComponent,
    MainComponent,
    ListCustomerComponent,
    ListOrderComponent,
    FooterComponent,
    BooksManagerComponent,
    AuthorManagerComponent,
    LoginAdminComponent,
    AdvertisementComponent,
    TopSoldComponent,
    ProfileComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    BookDetailAdvertisementComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    ButtonModule,
    TabViewModule,
    MessagesModule,
    MessageModule,
    OverlayPanelModule,
    RippleModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    FormsModule,
    MatDialogModule,
    InputTextareaModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ChartModule,
    CarouselModule,
    MatFormFieldModule,
    MatInputModule,
    PaginatorModule,
    PasswordModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [DialogService,MessageService],
  bootstrap: [AppComponent],
  entryComponents:[ListOrderItemComponent]
})
export class AppModule { }
