import {Component, OnInit} from '@angular/core';
import {IOrderResult} from "../../orders/models/IOrderResult";
import {Store} from "@ngxs/store";
import {OrderStatus} from "../../orders/enums/OrderStatus";
import {AuthState} from "../../users/state/auth.state";
import {GetBuyerOrders} from "../../orders/state/order.action";
import {OrdersState} from "../../orders/state/order.state";
import {map} from "rxjs";

@Component({
  selector: 'app-buyer-profile-orders',
  templateUrl: './buyer-profile-orders.component.html',
  styleUrls: ['./buyer-profile-orders.component.scss']
})
export class BuyerProfileOrdersComponent implements OnInit {

    displayedColumns: string[] = ['id', 'shop', 'email', 'phone', 'cost', 'date', 'status', 'actions'];

    buyerOrders!: IOrderResult[];

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        const buyerId = this.store.selectSnapshot(AuthState.buyerId);
        this.store.dispatch(new GetBuyerOrders());
        this.store.select(OrdersState.selectBuyerOrders)
            .pipe(map(filter => filter(buyerId!)))
            .subscribe(data => {
                this.buyerOrders = data;
                console.log(data);
            });
    }

    getOrderStatusString(status: number): string {
        return OrderStatus[status];
    }
}
