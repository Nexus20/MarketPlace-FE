import {IBaseResult} from "../../core/models/IBaseResult";
import {IProductResult} from "../../products/models/IProductResult";

export interface IShopResult extends IBaseResult {
    products: IProductResult[];
    name: string;
    phone: string;
    email: string;
    description?: string;
    address?: string;
    siteUrl?: string;
}
