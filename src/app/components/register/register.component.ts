import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AppValidators} from "../../validators/AppValidators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(private authService:AuthService, private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.builderForm();
  }
  builderForm(){
    this.registerForm = this.formBuilder.group({
      username: new FormControl(
        "", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      email: new FormControl(
       " ", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
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

  }
}
