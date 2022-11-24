import {IProductResult} from "../../products/models/IProductResult";

export class AddItemToBasket {
    static readonly type = '[Basket] AddItem';

    constructor(public payload: IProductResult) {
    }
}

export class RemoveItemFromBasket {
    static readonly type = '[Basket] RemoveItem';

    constructor(public payload: any) {
    }
}

export class ChangeItemCount {
    static readonly type = '[Basket] ChangeItemCount';

    constructor(public payload: { email: string, password: string }) {
    }
}