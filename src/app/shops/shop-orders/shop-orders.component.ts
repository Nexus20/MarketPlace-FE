import {Component, OnInit} from '@angular/core';
import {IShopResult} from "../models/IShopResult";
import {IOrderResult} from "../../orders/models/IOrderResult";
import {Store} from "@ngxs/store";
import {AuthState} from "../../users/state/auth.state";
import {map} from "rxjs";
import {GetShopOrders} from "../../orders/state/order.action";
import {OrdersState} from "../../orders/state/order.state";
import {OrderStatus} from "../../orders/enums/OrderStatus";

@Component({
    selector: 'app-shop-orders',
    templateUrl: './shop-orders.component.html',
    styleUrls: ['./shop-orders.component.scss']
})
export class ShopOrdersComponent implements OnInit {

    displayedColumns: string[] = ['id', 'buyer', 'email', 'phone', 'cost', 'date', 'status', 'actions'];

    shopInfo!: IShopResult;
    shopOrders!: IOrderResult[];

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        const shopId = this.store.selectSnapshot(AuthState.shopId);
        this.store.dispatch(new GetShopOrders());
        this.store.select(OrdersState.selectShopOrders)
            .pipe(map(filter => filter(shopId!)))
            .subscribe(data => {
                this.shopOrders = data;
                console.log(data);
            });
    }

    getOrderStatusString(status: number): string {
        return OrderStatus[status];
    }
}
