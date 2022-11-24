import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {tap} from "rxjs";
import {
    AddShopProduct,
    DeleteProduct,
    GetProductById,
    GetProducts,
    GetShopProducts,
    UpdateProduct
} from "./product.action";
import {ProductsStateModel} from "./product.model";
import {ProductService} from "../product.service";
import {ShopService} from "../../shops/shop.service";

@State<ProductsStateModel>({
    name: 'productsState',
    defaults: {
        products: []
    }
})

@Injectable()
export class ProductsState {

    constructor(private store: Store, private _productService: ProductService, private _shopService: ShopService) {}

    @Selector()
    static selectAllProductsFromState(state: ProductsStateModel) {
        return state.products;
    }

    @Selector()
    static selectShopProducts(state:ProductsStateModel) {
        return (shopId: string) => {
            return state.products.filter(x => x.shopId == shopId);
        }
    }

    @Selector()
    static selectProductById(state:ProductsStateModel) {
        return (productId: string) => {
            return state.products.filter(x => x.id == productId)[0];
        }
    }

    @Action(GetShopProducts)
    getShopProductsFromState(ctx: StateContext<ProductsStateModel>, {queryParams} : GetShopProducts) {
        return this._shopService.getShopProducts(queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                products: returnData
            });

            if(returnData.length == 0)
                return;
        }))
    }

    @Action(AddShopProduct)
    addProductToShop(ctx: StateContext<ProductsStateModel>, { payload }: AddShopProduct) {
        return this._productService.create(payload).pipe(tap(returnData => {
            const state=ctx.getState();

            ctx.patchState({
                products:[...state.products, returnData]
            })
        }));
    }

    @Action(GetProducts)
    getDataFromState(ctx: StateContext<ProductsStateModel>, {queryParams} : GetProducts) {

        return this._productService.get(queryParams).pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                products: returnData
            });
        }))
    }

    @Action(GetProductById)
    getProductByIdFromState(ctx: StateContext<ProductsStateModel>, { id } : GetProductById) {
        return this._productService.getById(id).pipe(tap(returnData => {
            const state=ctx.getState();

            ctx.patchState({
                products:[...state.products, returnData]
            })
        }));
    }

    @Action(UpdateProduct)
    updateDataOfState(ctx: StateContext<ProductsStateModel>, { payload, id }: UpdateProduct) {

        console.log("Update", id);

        return this._productService.update(id, payload).pipe(tap(returnData => {

            const state=ctx.getState();
            const products = [...state.products];
            const index = products.findIndex(x => x.id == id);
            products[index] = returnData;

            ctx.setState({
                ...state,
                products: products,
            });
        }))
    }

    @Action(DeleteProduct)
    deleteDataFromState(ctx: StateContext<ProductsStateModel>, { id }: DeleteProduct) {
        return this._productService.delete(id).pipe(tap(() => {
            const state=ctx.getState();
            console.log("The is is", id)
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
            const filteredArray = state.products.filter((contents: { id: string; }) => contents.id!==id);

            ctx.setState({
                ...state,
                products: filteredArray
            })
        }))
    }
}
