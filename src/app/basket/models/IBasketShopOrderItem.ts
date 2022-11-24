import {IProductResult} from "../../products/models/IProductResult";

export interface IBasketShopOrderItem {
    product: IProductResult;
    count: number;
}
