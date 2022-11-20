import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {tap} from "rxjs";
import {IShopResult} from "./models/IShopResult";
import {ShopService} from "./shop.service";
import {AddShop, DeleteShop, GetShops, UpdateShop} from "./shop.action";

export class ShopsStateModel {
    shops!: IShopResult[]
}

@State<ShopsStateModel>({
    name: 'shopsState',
    defaults: {
        shops: []
    }
})

@Injectable()
export class ShopsState {

    constructor(private _shopService: ShopService) {}

    @Selector()
    static selectStateData(state:ShopsStateModel){
        return state.shops;
    }

    @Action(GetShops)
    getDataFromState(ctx: StateContext<ShopsStateModel>) {

        return this._shopService.get().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                shops: returnData
            });
        }))
    }

    @Action(AddShop)
    addDataToState(ctx: StateContext<ShopsStateModel>, { payload }: AddShop) {
        return this._shopService.create(payload).pipe(tap(returnData => {
            const state=ctx.getState();

            ctx.patchState({
                shops:[...state.shops, returnData]
            })
        }))
    }

    @Action(UpdateShop)
    updateDataOfState(ctx: StateContext<ShopsStateModel>, { payload, id, i }: UpdateShop) {

        return this._shopService.update(id, payload).pipe(tap(returnData => {

            const state=ctx.getState();
            const shops = [...state.shops];
            shops[i]=payload;

            ctx.setState({
                ...state,
                shops: shops,
            });
        }))
    }

    @Action(DeleteShop)
    deleteDataFromState(ctx: StateContext<ShopsStateModel>, { id }: DeleteShop) {
        return this._shopService.delete(id).pipe(tap(returnData => {
            const state=ctx.getState();
            console.log("The is is", id)
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
            const filteredArray = state.shops.filter((contents: { id: string; }) => contents.id!==id);

            ctx.setState({
                ...state,
                shops: filteredArray
            })
        }))
    }
}
