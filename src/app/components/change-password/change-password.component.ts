import { Component, OnInit } from '@angular/core';
import {User} from "../../common/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {MatDialog} from "@angular/material/dialog";
import {ProfileComponent} from "../profile/profile.component";
import {UsersService} from "../../services/users.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AppValidators} from "../../validators/AppValidators";
import {finalize} from "rxjs/operators";
import {ChangePasswordRequest} from "../../common/ChangePasswordRequest";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user:User
  hide = true;
  changePasswordForm:FormGroup;
  constructor(private authService:AuthService,
              private userService:UsersService,
              private formBuilder: FormBuilder,
              private router:Router,
              private storage:AngularFireStorage,
              private alertService:AlertService,
              private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.buildForm()
  }
  showChangePasswordDialog(){
    this.matDialog.closeAll();
    this.matDialog.open(ChangePasswordComponent);
  }
  buildForm(){
    this.changePasswordForm = this.formBuilder.group({
      id: new FormControl(this.user.id),
      oldPassword:new FormControl("",[Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      newPassword:new FormControl("",[Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      newPasswordConfirm:new FormControl("")
    },{validators:AppValidators.checkPasswords})
  }

  get oldPassword(){
    return this.changePasswordForm.get("oldPassword");
  }
  get newPassword(){
    return this.changePasswordForm.get("newPassword");
  }
  get newPasswordConfirm(){
    return this.changePasswordForm.get("newPasswordConfirm");
  }

 updatePassword(){
    const rq = new ChangePasswordRequest();
    rq.id = this.changePasswordForm.controls["id"].value;
    rq.oldPassword = this.changePasswordForm.controls["oldPassword"].value;
    rq.newPassword = this.changePasswordForm.controls["newPassword"].value;
    this.userService.changePassword(rq).subscribe(data =>{
      this.authService.loginSuccess(data);
      this.alertService.alertUpdateSuccess();
      this.changePasswordForm.reset()
    },error => {
      this.alertService.alertFail(error.error.message)
    })
 }

  showInforDialog(){
    this.matDialog.closeAll();
    this.matDialog.open(ProfileComponent)
  }
}
