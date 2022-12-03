import {Component, OnInit} from '@angular/core';
import {IProductResult} from "../models/IProductResult";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngxs/store";
import {GetProductById} from "../state/product.action";
import {ProductsState} from "../state/products.state";
import {map} from "rxjs";
import {AddItemToBasket} from "../../basket/state/basket.action";

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss']
})


export class ProductViewComponent implements OnInit {

    public productInfo!: IProductResult;
    private productId!: string;

    constructor(private route: ActivatedRoute,
                private store: Store) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.productId = params['id'];
            this.store.dispatch(new GetProductById(this.productId)).subscribe(() => {
                this.store.select(ProductsState.selectProductById)
                    .pipe(map(filter => filter(this.productId)))
                    .subscribe(data => {
                        this.productInfo = data;
                    });
            })
        });
    }

    addToBasket() {
        this.store.dispatch(new AddItemToBasket(this.productInfo));
    }
}
