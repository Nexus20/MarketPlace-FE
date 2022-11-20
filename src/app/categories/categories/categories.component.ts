import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../category.service";
import {ICategoryResult} from "../models/ICategoryResult";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoriesState} from "../categories.state";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {AddCategory, GetCategories} from "../category.action";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    categoryForm!: FormGroup;
    categories!: ICategoryResult[];
    displayedColumns: string[] = ['id', 'name'];
    @Select(CategoriesState.selectStateData) categoriesInfo!: Observable<any>;

    constructor(private store: Store, private formBuilder: FormBuilder) {}

    ngOnInit(): void {

        this.categoryForm = this.formBuilder.group({
            name: new FormControl("", Validators.required)
        });

        this.store.dispatch(new GetCategories());
        this.categoriesInfo.subscribe((returnData) => {
            this.categories = returnData;
        })

        // this.getCategories();
    }

    addCategory() {
        console.log(this.categoryForm.value)
        this.store.dispatch(new AddCategory(this.categoryForm.value));
        this.categoryForm.reset();
    }
}
