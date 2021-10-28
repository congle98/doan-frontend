import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AppValidators} from "../../validators/AppValidators";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService:AlertService,
              private route:ActivatedRoute
              ) {
  }

  ngOnInit(): void {
    this.authService.logOut();
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      password: new FormControl("", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace])
    })
  }

  get username(){
    return this.loginForm.get("username");
  }
  get password(){
    return this.loginForm.get("password");
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    let userName = this.loginForm.controls["username"].value;
    let password = this.loginForm.controls["password"].value;
    this.authService.login(userName, password).subscribe((sussces) => {
        this.authService.loginSuccess(sussces);
        this.router.navigate([""],{relativeTo:this.route})
        this.loginForm.reset();
      },
      (error) => {
        this.alertService.alertFail(error.error.message);
      }
    );
  }

}
