import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {tap} from "rxjs";
import {
    DeleteOrder,
    GetOrderById,
    GetOrders,
    GetShopOrders, PlaceOrder,
    UpdateOrder
} from "./order.action";
import {OrdersStateModel} from "./order.model";
import {OrderService} from "../order.service";
import {ShopService} from "../../shops/shop.service";

@State<OrdersStateModel>({
    name: 'ordersState',
    defaults: {
        orders: []
    }
})

@Injectable()
export class OrdersState {

    constructor(private store: Store, private _orderService: OrderService, private _shopService: ShopService) {}

    @Selector()
    static selectAllOrdersFromState(state: OrdersStateModel) {
        return state.orders;
    }

    @Selector()
    static selectShopOrders(state:OrdersStateModel) {
        return (shopId: string) => {
            return state.orders.filter(x => x.shopId == shopId);
        }
    }

    @Selector()
    static selectOrderById(state:OrdersStateModel) {
        return (orderId: string) => {
            return state.orders.filter(x => x.id == orderId)[0];
        }
    }

    // @Action(GetShopOrders)
    // getShopOrdersFromState(ctx: StateContext<OrdersStateModel>, {queryParams} : GetShopOrders) {
    //     return this._shopService.getShopOrders(queryParams).pipe(tap(returnData => {
    //         const state = ctx.getState();
    //
    //         ctx.setState({
    //             ...state,
    //             orders: returnData
    //         });
    //
    //         if(returnData.length == 0)
    //             return;
    //     }))
    // }

    @Action(PlaceOrder)
    placeOrder(ctx: StateContext<OrdersStateModel>, { payload }: PlaceOrder) {
        return this._orderService.create(payload).pipe(tap(returnData => {
            const state=ctx.getState();

            ctx.patchState({
                orders:[...state.orders, returnData]
            })
        }));
    }

    @Action(GetOrders)
    getDataFromState(ctx: StateContext<OrdersStateModel>, {queryParams} : GetOrders) {

        return this._orderService.get(queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                orders: returnData
            });
        }))
    }

    @Action(GetOrderById)
    getOrderByIdFromState(ctx: StateContext<OrdersStateModel>, { id } : GetOrderById) {
        return this._orderService.getById(id).pipe(tap(returnData => {
            const state=ctx.getState();

            ctx.patchState({
                orders:[...state.orders, returnData]
            })
        }));
    }

    @Action(UpdateOrder)
    updateDataOfState(ctx: StateContext<OrdersStateModel>, { payload, id }: UpdateOrder) {

        console.log("Update", id);

        return this._orderService.update(id, payload).pipe(tap(returnData => {

            const state=ctx.getState();
            const orders = [...state.orders];
            const index = orders.findIndex(x => x.id == id);
            orders[index] = returnData;

            ctx.setState({
                ...state,
                orders: orders,
            });
        }))
    }

    @Action(DeleteOrder)
    deleteDataFromState(ctx: StateContext<OrdersStateModel>, { id }: DeleteOrder) {
        return this._orderService.delete(id).pipe(tap(() => {
            const state=ctx.getState();
            console.log("The is is", id)
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
            const filteredArray = state.orders.filter((contents: { id: string; }) => contents.id!==id);

            ctx.setState({
                ...state,
                orders: filteredArray
            })
        }))
    }
}
