import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{


  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
  }

}
