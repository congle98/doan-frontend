import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AppValidators} from "../../validators/AppValidators";
import {RegisterRequest} from "../../common/RegisterRequest";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(private authService:AuthService,
              private formBuilder: FormBuilder,
              private router:Router,
              private alertService:AlertService) { }

  ngOnInit(): void {
    this.builderForm();
  }
  builderForm(){
    this.registerForm = this.formBuilder.group({
      username: new FormControl(
        "", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      email: new FormControl(
       "", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl(
        "", [Validators.required, Validators.pattern("^(84|0[3|5|7|8|9])+([0-9]{8})$")]),
      password: new FormControl(
        "", [Validators.required,  Validators.minLength(2), AppValidators.notOnlyWhitespace])
    })
  }
  get username(){
    return this.registerForm.get("username");
  }
  get email(){
    return this.registerForm.get("email");
  }
  get phone(){
    return this.registerForm.get("phone");
  }
  get password(){
    return this.registerForm.get("password");
  }


  onSubmit(){
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    let registerRequest:RegisterRequest = {
      email:this.registerForm.controls["email"].value,
      username:this.registerForm.controls["username"].value,
      password:this.registerForm.controls["password"].value,
      phone:this.registerForm.controls["phone"].value
    }
    this.authService.register(registerRequest).subscribe((success) => {
        this.alertService.alertSuccess("Đăng ký thành công hãy bắt đầu mua sắm !")
      this.registerForm.reset();
      this.router.navigateByUrl("/login");
    },
      (error) => {
        this.alertService.alertFail(error.error.message);
    })
  }
}
