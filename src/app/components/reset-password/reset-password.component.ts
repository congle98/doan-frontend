import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {AppValidators} from "../../validators/AppValidators";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService:AlertService,
              private route:ActivatedRoute,
              private userService:UsersService,
              private matDialog:MatDialog
  ) {
  }

  ngOnInit(): void {
    this.authService.logOut();
    this.resetPasswordForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    })
  }

  get username(){
    return this.resetPasswordForm.get("username");
  }
  get email(){
    return this.resetPasswordForm.get("email");
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }
    const request = this.resetPasswordForm.value;
      this.userService.resetPassword(request).subscribe(()=>{
        this.alertService.alertSuccess("Mật khẩu mới đã được thiết lập lại, vui lòng kiểm tra email!");
      },error => {
        this.alertService.alertFail(error.error.message);
      })
  }
  showRegisterDialog(){
   this.matDialog.closeAll();
   this.matDialog.open(RegisterComponent)
  }
  showLoginDialog(){
    this.matDialog.closeAll();
    this.matDialog.open(LoginComponent)
  }
}
