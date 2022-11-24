import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AddItemToBasket} from "./basket.action";
import {IBasketStateModel} from "./basket.model";
import {IBasketItem} from "../models/IBasketItem";

@State<IBasketStateModel>({
    name: 'basket',
    defaults: {
        items: []
    }
})
@Injectable()
export class BasketState {

    @Selector()
    static selectStateData(state: IBasketStateModel) {
        return state.items;
    }

    @Action(AddItemToBasket)
    addItemToBasket(ctx: StateContext<IBasketStateModel>, {payload}: AddItemToBasket) {
        const state = ctx.getState();

        const index = state.items.findIndex(x => x.shopId == payload.shopId);

        if (index == -1) {
            const itemToAdd: IBasketItem = {
                shopId: payload.shopId,
                orderItems: [{
                    count: 1,
                    product: payload
                }]
            };

            ctx.patchState({
                items: [...state.items, itemToAdd]
            });

        } else {
            state.items[index].orderItems.push({
                count: 1,
                product: payload
            });

            ctx.patchState({
                items: [...state.items]
            });
        }
    }
}
