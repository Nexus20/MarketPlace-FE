import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRegisterComponent } from './shop-register/shop-register.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ShopsComponent } from './shops/shops.component';
import {MatTableModule} from "@angular/material/table";
import { ShopProductsComponent } from './shop-products/shop-products.component';
import {ShopCreateProductComponent} from "./shop-create-product/shop-create-product.component";
import { ShopUpdateProductComponent } from './shop-update-product/shop-update-product.component';


@NgModule({
  declarations: [
    ShopRegisterComponent,
    ShopsComponent,
    ShopProductsComponent,
      ShopCreateProductComponent,
      ShopUpdateProductComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ShopsComponent},
            {path: 'register', component: ShopRegisterComponent},
            {path: 'products', component: ShopProductsComponent},
            {path: 'products/add', component: ShopCreateProductComponent},
            {path: 'products/:id/edit', component: ShopUpdateProductComponent},
        ]),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
    ]
})
export class ShopsModule { }
