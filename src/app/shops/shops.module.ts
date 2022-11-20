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


@NgModule({
  declarations: [
    ShopRegisterComponent,
    ShopsComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: 'register', component: ShopRegisterComponent},
        ]),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
    ]
})
export class ShopsModule { }
