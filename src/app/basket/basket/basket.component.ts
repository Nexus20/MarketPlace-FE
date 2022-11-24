import { Component } from '@angular/core';
import {IShopResult} from "../../shops/models/IShopResult";
import {Select, Store} from "@ngxs/store";
import {ShopsState} from "../../shops/state/shops.state";
import {Observable} from "rxjs";
import {GetShops} from "../../shops/state/shop.action";
import {BasketState} from "../state/basket.state";
import {IBasketItem} from "../models/IBasketItem";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

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
}
