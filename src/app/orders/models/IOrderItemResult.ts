import {IBaseResult} from "../../core/models/IBaseResult";

export interface IOrderItemResult extends IBaseResult {
    count: number;
    productId: string;
    productName: string;
    cost: number;
}
