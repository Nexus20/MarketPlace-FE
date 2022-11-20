import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {CategoryUpdateComponent} from './category-edit/category-update.component';
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [
        CategoriesComponent,
        CategoryCreateComponent,
        CategoryUpdateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: CategoriesComponent},
            {path: 'create', component: CategoryCreateComponent},
            {path: 'update', component: CategoryUpdateComponent},
        ]),
        MatTableModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        FormsModule
    ]
})
export class CategoriesModule {
}
