import {ICategoryResult} from "./models/ICategoryResult";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {CategoryService} from "./category.service";
import {AddCategory, DeleteCategory, GetCategories, UpdateCategory} from "./category.action";
import {tap} from "rxjs";

export class CategoriesStateModel {
    categories!: ICategoryResult[]
}

@State<CategoriesStateModel>({
    name: 'categoriesState',
    defaults: {
        categories: []
    }
})

@Injectable()
export class CategoriesState {

    constructor(private _categoryService: CategoryService) {}

    @Selector()
    static selectStateData(state:CategoriesStateModel){
        return state.categories;
    }

    @Action(GetCategories)
    getDataFromState(ctx: StateContext<CategoriesStateModel>) {

        return this._categoryService.get().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                categories: returnData
            });
        }))
    }

    @Action(AddCategory)
    addDataToState(ctx: StateContext<CategoriesStateModel>, { payload }: AddCategory) {
        return this._categoryService.create(payload).pipe(tap(returnData => {
            const state=ctx.getState();

            ctx.patchState({
                categories:[...state.categories, returnData]
            })
        }))
    }

    @Action(UpdateCategory)
    updateDataOfState(ctx: StateContext<CategoriesStateModel>, { payload, id, i }: UpdateCategory) {

        return this._categoryService.update(id, payload).pipe(tap(returnData => {

            const state=ctx.getState();
            const categories = [...state.categories];
            categories[i]=payload;

            ctx.setState({
                ...state,
                categories: categories,
            });
        }))
    }

    @Action(DeleteCategory)
    deleteDataFromState(ctx: StateContext<CategoriesStateModel>, { id }: DeleteCategory) {
        return this._categoryService.delete(id).pipe(tap(returnData => {
            const state=ctx.getState();
            console.log("The is is",id)
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
            const filteredArray = state.categories.filter((contents: { id: string; }) => contents.id!==id);

            ctx.setState({
                ...state,
                categories: filteredArray
            })
        }))
    }
}
