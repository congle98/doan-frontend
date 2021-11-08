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

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user:User
  changePasswordForm:FormGroup;
  imageFile:any;
  imageUrl:string;
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
    this.imageUrl = this.user.avatarUrl;
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
  setAvatar(event:any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) =>  this.imageUrl = e.target.result;
      this.imageFile = event.target.files[0];


    } else {
      this.imageUrl = "";
    }
  }
  // updateProfile(){
  //   if (this.updateForm.invalid) {
  //     this.updateForm.markAllAsTouched();
  //     return;
  //   }
  //   if (this.imageFile) {
  //     const filePath = `${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, this.imageFile).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe((url:any) => {
  //           this.imageUrl = url;
  //           this.updateToBackend();
  //         });
  //       })).subscribe();
  //   }
  //   else {
  //     this.updateToBackend();
  //   }
  // }
  //
  // updateToBackend(){
  //   let user:User = new User();
  //   user.id = this.updateForm.controls["id"].value;
  //   user.fullName = this.updateForm.controls["fullName"].value;
  //   user.phone = this.updateForm.controls["phone"].value;
  //   user.email = this.updateForm.controls["email"].value;
  //   user.avatarUrl = this.imageUrl;
  //   this.userService.updateProfile(user).subscribe(data =>{
  //     this.user = data
  //     this.authService.loginSuccess(this.user);
  //     this.alertService.alertUpdateSuccess();
  //   })
  // }

  showInforDialog(){
    this.matDialog.closeAll();
    this.matDialog.open(ProfileComponent)
  }
}
