import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {tap} from "rxjs";
import {ShopService} from "../shop.service";
import {AddShop, DeleteShop, GetShopProducts, GetShops, UpdateShop} from "./shop.action";
import {ShopsStateModel} from "./shops.model";

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

    @Selector()
    static selectShopById(state:ShopsStateModel) {
        return (shopId: string) => {
            return state.shops.filter(x => x.id == shopId)[0];
        }
    }

    @Action(GetShops)
    getDataFromState(ctx: StateContext<ShopsStateModel>, {queryParams} : GetShops) {

        return this._shopService.get(queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                shops: returnData
            });
        }))
    }

    @Action(GetShopProducts)
    getGetShopProductsFromState(ctx: StateContext<ShopsStateModel>, {queryParams} : GetShopProducts) {
        return this._shopService.getShopProducts(queryParams).pipe(tap(returnData => {

            if(returnData.length == 0)
                return;

            const state = ctx.getState();
            const shops = [...state.shops];

            const idx = shops.findIndex(x => x.id == returnData[0].shopId);
            shops[idx].products = returnData;

            ctx.setState({
                ...state,
                shops: shops,
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
