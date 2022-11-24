import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {BasketState} from "../state/basket.state";
import {IBasketItem} from "../models/IBasketItem";
import {ChangeItemCount, RemoveItemFromBasket} from "../state/basket.action";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

    basketItems!: IBasketItem[];
    @Select(BasketState.selectStateData) selector!: Observable<any>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.selector.subscribe((returnData) => {
            this.basketItems = returnData;
            console.log("Basket data:", returnData);
        })
    }

    changeOrderItemCount(shopId: string, productId: string, newCount: number) {
        this.store.dispatch(new ChangeItemCount({shopId, productId, newCount})).subscribe(() => {
            const basketItemIndex = this.basketItems.findIndex(x => x.shopId == shopId);
            const orderItemIndex = this.basketItems[basketItemIndex].orderItems.findIndex(x => x.product.id == productId);
            this.basketItems[basketItemIndex].orderItems[orderItemIndex].count = newCount;
        });
    }

    removeItemFromBasket(shopId: string, productId: string) {
        this.store.dispatch(new RemoveItemFromBasket({shopId, productId})).subscribe(() => {
            this.selector.subscribe((returnData) => {
                this.basketItems = returnData;
            })
        });
    }

    proceedToCheckout(shopId: string) {

    }
}
