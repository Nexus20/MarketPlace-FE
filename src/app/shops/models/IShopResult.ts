import {IBaseResult} from "../../core/models/IBaseResult";

export interface IShopResult extends IBaseResult {
     name: string;
     phone: string;
     email: string;
     description?: string;
     address?: string;
     siteUrl?: string;
}
