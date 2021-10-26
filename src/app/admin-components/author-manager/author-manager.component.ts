import {Component, OnInit} from '@angular/core';
import {Author} from "../../common/Author";
import {AuthorService} from "../../services/author.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppValidators} from "../../validators/AppValidators";
import Swal from "sweetalert2";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-author-manager',
  templateUrl: './author-manager.component.html',
  styleUrls: ['./author-manager.component.css']
})
export class AuthorManagerComponent implements OnInit {
  authors: Author[] = [];
  authorDialog: boolean;
  authorForm: FormGroup;
  isEdit = false;

  constructor(private authorService: AuthorService, private formBuilder: FormBuilder, private alertService:AlertService) {
  }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  openNew() {
    this.authorForm = this.formBuilder.group({
      name: new FormControl(
        "", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      introduce: new FormControl(
        "", [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace])
    })
    this.isEdit = false;
    this.authorDialog = true;
  }

  hideDialog() {
    this.authorDialog = false;
  }

  editAuthor(author: Author) {
    let id = author.id;
    let name = author.name;
    let introduce = author.introduce;
    this.authorForm = this.formBuilder.group({
      id: new FormControl(
        id, [Validators.required]),
      name: new FormControl(
        name, [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace]),
      introduce: new FormControl(
        introduce, [Validators.required, Validators.minLength(2), AppValidators.notOnlyWhitespace])
    })
    this.isEdit = true;
    this.authorDialog = true;
  }

  get name(){
    return this.authorForm.get("name");
  }
  get introduce(){
    return this.authorForm.get("introduce");
  }

  getAllAuthors() {
    this.authorService.getAllAuthors().subscribe(data => {
      this.authors = data;
    })
  }

  saveAuthorToBackend() {
    let author = new Author();
    author.name = this.authorForm.controls["name"].value;
    author.introduce = this.authorForm.controls["introduce"].value;
    if(this.isEdit) author.id = this.authorForm.controls["id"].value;
    console.log("author"+author)
    this.authorService.saveAuthor(author).subscribe(data => {
      if (this.isEdit) {
        this.authors = this.authors.map(item => {
          if (item.id == data.id) {
            item = data;
          }
          return item
        })
      } else {
        this.authors.push(data)
      }
      this.alertService.alertUpdateSuccess();
    });
    this.hideDialog();
  }

  changeActive(author: Author) {
    this.authorService.changeStatus(author.id).subscribe(data =>{
      this.authors = this.authors.map(item =>{
        if(item.id == data.id){
          item = data
        }
        return item;
      })
      this.alertService.alertUpdateSuccess();
    })
  }
}
