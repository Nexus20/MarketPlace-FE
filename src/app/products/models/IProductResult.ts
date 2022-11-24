import {IBaseResult} from "../../core/models/IBaseResult";
import {ICategoryResult} from "../../categories/models/ICategoryResult";

export interface IProductResult extends IBaseResult{
    name: string;
    description?: string;
    price: number;
    discount?: number;
    count: number;
    shopId: string;
    categories?: ICategoryResult[];
}
