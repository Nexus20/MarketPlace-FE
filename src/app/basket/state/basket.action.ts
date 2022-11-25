import {IProductResult} from "../../products/models/IProductResult";

export class AddItemToBasket {
    static readonly type = '[Basket] AddItem';

    constructor(public payload: IProductResult) {
    }
}

export class RemoveItemFromBasket {
    static readonly type = '[Basket] RemoveItem';

    constructor(public payload: { shopId: string, productId: string }) {
    }
}

export class ChangeItemCount {
    static readonly type = '[Basket] ChangeItemCount';

    constructor(public payload: { shopId: string, productId: string, newCount: number }) {
    }
}

export class ClearBasket {
    static readonly type = '[Basket] Clear';
}
