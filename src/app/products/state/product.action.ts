//Read
export class GetProducts {
    static readonly type = '[Products] Fetch';

    constructor(public queryParams?: {}) {
    }
}

export class GetProductById {
    static readonly type = '[Products] GetById';

    constructor(public id: string) {
    }
}

export class GetShopProducts {
    static readonly type = '[Products] GetShopProducts'

    constructor(public queryParams?: {}) {
    }
}

//Create
export class AddShopProduct {
    static readonly type = '[Products] AddProduct';

    constructor(public payload: any) {
    }
}

//Update
export class UpdateProduct {
    static readonly type = '[Products] Update';

    constructor(public id: string, public payload: any) {
    }
}

export class AddProductPhotos {
    static readonly type = '[Products] AddPhotos';

    constructor(public id: string, public payload: FormData) {
    }
}

//Delete
export class DeleteProduct {
    static readonly type = '[Products] Delete';

    constructor(public id: string) {
    }
}
