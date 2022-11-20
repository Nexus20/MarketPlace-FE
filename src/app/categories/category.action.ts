//Read
export class GetCategories {
    static readonly type = '[Categories] Fetch';
}

//Create
export class AddCategory {
    static readonly type = '[Categories] Add';
    constructor(public payload: any) { }
}

//Update
export class UpdateCategory {
    static readonly type = '[Categories] Update';
    constructor(public payload: any, public id: string, public i:number) { }
}

//Delete
export class DeleteCategory {
    static readonly type = '[Categories] Delete';
    constructor(public id: string) { }
}
