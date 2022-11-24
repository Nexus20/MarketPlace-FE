import { Component } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {IProductResult} from "../models/IProductResult";
import {ProductsState} from "../state/products.state";
import {GetProducts} from "../state/product.action";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {

    products!: IProductResult[];
    @Select(ProductsState.selectAllProductsFromState) productsSelector!: Observable<any>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetProducts());
        this.productsSelector.subscribe((returnData) => {
            this.products = returnData;
        });
    }
}
