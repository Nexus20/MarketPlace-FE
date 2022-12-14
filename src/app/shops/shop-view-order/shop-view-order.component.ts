import {Component, OnInit} from '@angular/core';
import {IOrderResult} from "../../orders/models/IOrderResult";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngxs/store";
import {map} from "rxjs";
import {OrdersState} from "../../orders/state/order.state";
import {ChangeOrderStatus, GetOrderById} from "../../orders/state/order.action";
import {OrderStatus} from "../../orders/enums/OrderStatus";

@Component({
    selector: 'app-shop-view-order',
    templateUrl: './shop-view-order.component.html',
    styleUrls: ['./shop-view-order.component.scss']
})
export class ShopViewOrderComponent implements OnInit {

    public orderInfo!: IOrderResult;
    public isOrderNew!: boolean;
    public isOrderAccepted!: boolean;
    public isOrderCanceled!: boolean;
    public isOrderPaid!: boolean;
    public isOrderReceived!: boolean;
    public isOrderSent!: boolean;
    private orderId!: string;

    public orderStatus = OrderStatus;

    constructor(private route: ActivatedRoute,
                private store: Store) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.orderId = params['id'];
            this.store.dispatch(new GetOrderById(this.orderId)).subscribe(() => {
                this.store.select(OrdersState.selectOrderById)
                    .pipe(map(filter => filter(this.orderId)))
                    .subscribe(data => {
                        console.log("DATA: ", data)
                        this.orderInfo = data;

                        this.isOrderNew = this.orderInfo.status == OrderStatus.New;
                        this.isOrderAccepted = this.orderInfo.status == OrderStatus.Accepted;
                        this.isOrderCanceled = this.orderInfo.status == OrderStatus.Canceled;
                        this.isOrderPaid = this.orderInfo.status == OrderStatus.Paid;
                        this.isOrderReceived = this.orderInfo.status == OrderStatus.Received;
                        this.isOrderSent = this.orderInfo.status == OrderStatus.Sent;
                    });
            })
        });
    }

    getOrderStatusString(status: number): string {
        return OrderStatus[status];
    }

    changeOrderStatus(newStatus: OrderStatus) {
        this.store.dispatch(new ChangeOrderStatus(this.orderId, newStatus))
    }
}
