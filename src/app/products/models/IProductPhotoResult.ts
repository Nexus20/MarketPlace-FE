import {IBaseResult} from "../../core/models/IBaseResult";

export interface IProductPhotoResult extends IBaseResult {
    path: string;
    productId: string;
}
