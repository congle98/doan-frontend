import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {BookCategory} from "../../common/BookCategory";

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.css']
})
export class SiderBarComponent implements OnInit {

  categories:BookCategory[];
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(){
    // this.productService.getProductCategories().subscribe((data)=>{
    //   this.productCategories = data
    //   console.log(this.productCategories)
    // })
  }


}
