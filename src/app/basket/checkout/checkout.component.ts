import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {IBasketItem} from "../models/IBasketItem";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";
import {BasketState} from "../state/basket.state";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PlaceOrder} from "../../orders/state/order.action";
import {ClearBasket} from "../state/basket.action";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    basketItem!: IBasketItem;
    checkoutForm!: FormGroup;
    private shopId!: string;

    constructor(private route: ActivatedRoute, private store: Store, private formBuilder: FormBuilder, private router: Router) {
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

    submitForm() {
        if (!this.checkoutForm.valid)
            return;

        const payload = {
            shopId: this.shopId,
            country: this.checkoutForm.value["country"],
            city: this.checkoutForm.value["city"],
            address: this.checkoutForm.value["address"],
            comment: this.checkoutForm.value["comment"],
            orderItems: this.basketItem.orderItems.map(x => ({
                count: x.count,
                productId: x.product.id
            }))
        };

        console.log(payload);

        this.store.dispatch(new PlaceOrder(payload)).subscribe(() => {
            this.store.dispatch(new ClearBasket());
            this.router.navigate(['/user-profile/orders']);
        });
    }

    private createForm(): void {
        this.checkoutForm = this.formBuilder.group({
            country: new FormControl("", Validators.required),
            city: new FormControl("", Validators.required),
            address: new FormControl("", Validators.required),
            comment: new FormControl(""),
        });
    }
}
