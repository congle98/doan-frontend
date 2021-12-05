import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../common/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {Role} from "../../common/Role";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Book} from "../../common/Book";
import {UsersService} from "../../services/users.service";
import {AppValidators} from "../../validators/AppValidators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User
  updateForm:FormGroup;
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
    this.updateForm = this.formBuilder.group({
      id: new FormControl(this.user.id),
      fullName:new FormControl(this.user.fullName,[Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      email:new FormControl(this.user.email,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone:new FormControl(this.user.phone,[Validators.required, Validators.pattern("^(84|0[3|5|7|8|9])+([0-9]{8})$")])
    })
  }

  get fullName(){
    return this.updateForm.get("fullName");
  }
  get email(){
    return this.updateForm.get("email");
  }
  get phone(){
    return this.updateForm.get("phone");
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
  updateProfile(){
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }
    if (this.imageFile) {
      const filePath = `${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.imageFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url:any) => {
            this.imageUrl = url;
            this.updateToBackend();
          });
        })).subscribe();
    }
    else {
      this.updateToBackend();
    }
  }

  updateToBackend(){
    let user:User = new User();
    user.id = this.updateForm.controls["id"].value;
    user.fullName = this.updateForm.controls["fullName"].value;
    user.phone = this.updateForm.controls["phone"].value;
    user.email = this.updateForm.controls["email"].value;
    user.avatarUrl = this.imageUrl;
    this.userService.updateProfile(user).subscribe(data =>{
      this.user = data
      this.authService.loginSuccess(this.user);
      this.alertService.alertUpdateSuccess();
    },error => {
      this.alertService.alertFail(error.error.message)
    })
  }

}
