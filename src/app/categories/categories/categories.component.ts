import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../category.service";
import {ICategoryResult} from "../models/ICategoryResult";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    categories!: ICategoryResult[];

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.getCategories();
    }


    private getCategories() {
        this.categoryService.get().subscribe({
            next: (data: ICategoryResult[]) => {
                this.categories = data;
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
            }
        });
    }
}
