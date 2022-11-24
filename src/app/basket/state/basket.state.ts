import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AddItemToBasket, ChangeItemCount, RemoveItemFromBasket} from "./basket.action";
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

    @Selector()
    static selectBasketPartByShopId(state: IBasketStateModel) {
        return (shopId: string) => {
            return state.items.filter(x => x.shopId == shopId)[0];
        }
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

    @Action(ChangeItemCount)
    changeItemCount(ctx: StateContext<IBasketStateModel>, {payload}: ChangeItemCount) {
        const state = ctx.getState();
        const basketItemIndex = state.items.findIndex(x => x.shopId == payload.shopId);
        const orderItemIndex = state.items[basketItemIndex].orderItems.findIndex(x => x.product.id == payload.productId);
        state.items[basketItemIndex].orderItems[orderItemIndex].count = payload.newCount;
        ctx.patchState({
            items: [...state.items]
        });
    }

    @Action(RemoveItemFromBasket)
    removeItemFromBasket(ctx: StateContext<IBasketStateModel>, {payload}: RemoveItemFromBasket) {

        const state = ctx.getState();
        const basketItemIndex = state.items.findIndex(x => x.shopId == payload.shopId);
        const filteredOrderItems = state.items[basketItemIndex].orderItems.filter(x => x.product.id != payload.productId);

        if(!filteredOrderItems.length)
            state.items = state.items.filter(x => x.shopId != payload.shopId);
        else
            state.items[basketItemIndex].orderItems = filteredOrderItems;

        ctx.patchState({
            items: [...state.items]
        });
    }
}
