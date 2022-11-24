import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {IBasketItem} from "../models/IBasketItem";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {BasketState} from "../state/basket.state";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    basketItem!: IBasketItem;
    checkoutForm!: FormGroup;
    private shopId!: string;

    constructor(private route: ActivatedRoute, private store: Store, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {

        this.createForm();

        this.route.params.subscribe(params => {
            this.shopId = params['shop-id'];

            this.store.select(BasketState.selectBasketPartByShopId)
                .pipe(map(filter => filter(this.shopId)))
                .subscribe(data => {
                    this.basketItem = data;
                });
        });
    }

    private createForm() : void {
        this.checkoutForm = this.formBuilder.group({
            firstname: new FormControl("", Validators.required),
            lastname: new FormControl("", Validators.required),
            phone: new FormControl("", Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            country: new FormControl("", Validators.required),
            city: new FormControl("", Validators.required),
            address: new FormControl("", Validators.required),
            comment: new FormControl(""),
        });
    }

    submitForm() {
        if(!this.checkoutForm.valid)
            return;

        console.log(this.checkoutForm.value);
    }
}
