//Read
import {OrderStatus} from "../enums/OrderStatus";

export class GetOrders {
    static readonly type = '[Orders] Fetch';

    constructor(public queryParams?: {}) {
    }
}

export class GetOrderById {
    static readonly type = '[Orders] GetById';

    constructor(public id: string) {
    }
}

export class ChangeOrderStatus {
    static readonly type = '[Orders] ChangeStatus';

    constructor(public id: string, public newStatus: OrderStatus) {
    }
}

export class GetShopOrders {
    static readonly type = '[Orders] GetShopOrders'

    constructor(public queryParams?: {}) {
    }
}

export class GetBuyerOrders {
    static readonly type = '[Orders] GetBuyerOrders'

    constructor(public queryParams?: {}) {
    }
}

//Create
export class PlaceOrder {
    static readonly type = '[Orders] PlaceOrder';

    constructor(public payload: any) {
    }
}

//Update
export class UpdateOrder {
    static readonly type = '[Orders] Update';

    constructor(public id: string, public payload: any) {
    }
}

//Delete
export class DeleteOrder {
    static readonly type = '[Orders] Delete';

    constructor(public id: string) {
    }
}
