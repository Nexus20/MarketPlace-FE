import {IBaseResult} from "../../core/models/IBaseResult";
import {IOrderItemResult} from "./IOrderItemResult";
import {OrderStatus} from "../enums/OrderStatus";
import {PaymentMethod} from "../enums/PaymentMethod";

export interface IOrderResult extends IBaseResult {
    buyerId: string;
    shopId: string;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    country: string;
    city: string;
    address: string;
    cost: number;
    items: IOrderItemResult;
}

