//Read
export class GetShops {
    static readonly type = '[Shops] Fetch';
}

//Create
export class AddShop {
    static readonly type = '[Shops] Add';
    constructor(public payload: any) { }
}

//Update
export class UpdateShop {
    static readonly type = '[Shops] Update';
    constructor(public payload: any, public id: string, public i: number) { }
}

//Delete
export class DeleteShop {
    static readonly type = '[Shops] Delete';
    constructor(public id: string) { }
}
