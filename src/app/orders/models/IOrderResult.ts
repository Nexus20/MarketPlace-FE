import {IBaseResult} from "../../core/models/IBaseResult";
import {IOrderItemResult} from "./IOrderItemResult";
import {OrderStatus} from "../enums/OrderStatus";
import {PaymentMethod} from "../enums/PaymentMethod";
import {IUserResult} from "../../users/models/IUserResult";
import {IShopResult} from "../../shops/models/IShopResult";

export interface IOrderResult extends IBaseResult {
    buyerId: string;
    buyer: IBuyerResult;
    shopId: string;
    shop: IShopResult;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    country: string;
    city: string;
    address: string;
    cost: number;
    items: IOrderItemResult[];
}

export interface IShopOrderResult extends IBaseResult {
    buyer: IBuyerResult;
    items: IOrderItemResult[];
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    country: string;
    city: string;
    address: string;
    cost: number;
}

export interface IBuyerResult extends IUserResult {
    firstName: string;
    lastName: string;
}

