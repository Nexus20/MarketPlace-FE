import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products/products.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {ProductViewComponent} from './product-view/product-view.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        ProductsComponent,
        ProductViewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ProductsComponent},
            {path: ':id', component: ProductViewComponent}
        ]),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        SharedModule,
    ]
})

export class ProductsModule {
}
