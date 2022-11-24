import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ShopsState} from "../state/shops.state";
import {map, Observable} from "rxjs";
import {IShopResult} from "../models/IShopResult";
import {AuthState} from "../../users/state/auth.state";
import {IProductResult} from "../../products/models/IProductResult";
import {ProductsState} from "../../products/state/products.state";
import {GetShopProducts} from "../../products/state/product.action";

@Component({
    selector: 'app-shop-products',
    templateUrl: './shop-products.component.html',
    styleUrls: ['./shop-products.component.scss']
})
export class ShopProductsComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'description', 'price', 'discount', 'count', 'actions'];

    shopInfo!: IShopResult;
    shopProducts!: IProductResult[];
    @Select(ShopsState.selectStateData) shopsInfo!: Observable<any>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        const shopId = this.store.selectSnapshot(AuthState.shopId);
        this.store.dispatch(new GetShopProducts());
        this.store.select(ProductsState.selectShopProducts)
            .pipe(map(filter => filter(shopId!)))
            .subscribe(data => {
                this.shopProducts = data;
            });
    }
}
