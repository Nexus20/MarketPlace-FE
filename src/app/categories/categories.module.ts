import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryUpdateComponent } from './category-edit/category-update.component';
import {RouterModule} from "@angular/router";



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
      {path: 'edit', component: CategoryUpdateComponent},
    ])
  ]
})
export class CategoriesModule { }
