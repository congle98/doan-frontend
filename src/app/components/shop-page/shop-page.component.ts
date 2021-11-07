import { Component, OnInit } from '@angular/core';

import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {MatDialog} from "@angular/material/dialog";
import {SiderBarComponent} from "../sider-bar/sider-bar.component";

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {
  // showSidebar = false
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(SiderBarComponent);
  }
}
