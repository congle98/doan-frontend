import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuild:FormBuilder, private authService:AuthService,private alertService:AlertService, private router:Router ) { }

  ngOnInit(): void {
    this.buildForm();
    this.authService.logOut();
  }
  buildForm(){
    this.loginForm = this.formBuild.group({
      username: new FormControl(
        "", [Validators.required, Validators.minLength(2)]),
      password: new FormControl(
        "", [Validators.required,  Validators.minLength(2)])
    })
  }

  get username(){
    return this.loginForm.get("username");
  }
  get password(){
    return this.loginForm.get("password");
  }

  onSubmit(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    let userName = this.loginForm.controls["username"].value;
    let password = this.loginForm.controls["password"].value;
    this.authService.login(userName, password).subscribe((sussces) => {
        this.authService.loginSuccess(sussces);
        this.router.navigateByUrl("/admin")
        this.loginForm.reset();
      },
      (error) => {
        this.alertService.alertFail(error.error.message);
      }
    );
  }
}
