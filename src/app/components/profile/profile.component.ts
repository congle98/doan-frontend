import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../common/User";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../change-password/change-password.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User
  updateForm:FormGroup;
  constructor(private authService:AuthService,
              private formBuilder: FormBuilder,
              private router:Router,
              private alertService:AlertService,
              private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
  showChangePasswordDialog(){
    this.matDialog.closeAll();
    this.matDialog.open(ChangePasswordComponent);
  }

}
