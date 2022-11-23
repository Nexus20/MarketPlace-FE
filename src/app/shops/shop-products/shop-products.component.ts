import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ShopsState} from "../state/shops.state";
import {map, Observable} from "rxjs";
import {IShopResult} from "../models/IShopResult";
import {AuthState} from "../../users/state/auth.state";

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss']
})
export class ShopProductsComponent implements OnInit {

    shopInfo!: IShopResult;
    @Select(ShopsState.selectStateData) shopsInfo!: Observable<any>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        const shopId = this.store.selectSnapshot(AuthState.shopId);
        const shopInfoObservable = this.store.select(ShopsState.selectShopById)
            .pipe(map(filterFn => filterFn(shopId!)))

        shopInfoObservable.subscribe(data => {
           this.shopInfo = data;
        });
    }
}
