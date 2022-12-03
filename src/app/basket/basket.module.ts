import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasketComponent} from './basket/basket.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared/shared.module";
import {CheckoutComponent} from './checkout/checkout.component';


@NgModule({
    declarations: [
        BasketComponent,
        CheckoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: BasketComponent},
            {path: ':shop-id/checkout', component: CheckoutComponent},
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
export class BasketModule {
}
