import { Component, OnInit } from '@angular/core';
import {User} from "../../common/User";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {MatDialog} from "@angular/material/dialog";
import {ProfileComponent} from "../profile/profile.component";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
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
  showInforDialog(){
    this.matDialog.closeAll();
    this.matDialog.open(ProfileComponent)
  }
}
