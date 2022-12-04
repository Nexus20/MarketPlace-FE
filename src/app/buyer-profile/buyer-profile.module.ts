import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuyerProfileOrdersComponent} from './buyer-profile-orders/buyer-profile-orders.component';
import {BuyerProfileOrderComponent} from './buyer-profile-order/buyer-profile-order.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared/shared.module";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
    declarations: [
        BuyerProfileOrdersComponent,
        BuyerProfileOrderComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: 'orders', component: BuyerProfileOrdersComponent},
            {path: 'orders/:id', component: BuyerProfileOrderComponent},
        ]),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        SharedModule,
        MatSelectModule,
    ]
})
export class BuyerProfileModule {
}
