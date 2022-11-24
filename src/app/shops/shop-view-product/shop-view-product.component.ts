import {Component, OnInit} from '@angular/core';
import {IProductResult} from "../../products/models/IProductResult";
import {Store} from "@ngxs/store";
import {GetProductById} from "../../products/state/product.action";
import {ActivatedRoute} from "@angular/router";
import {ProductsState} from "../../products/state/products.state";
import {map} from "rxjs";

@Component({
  selector: 'app-shop-view-product',
  templateUrl: './shop-view-product.component.html',
  styleUrls: ['./shop-view-product.component.scss']
})

export class ShopViewProductComponent implements OnInit {

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
                        console.log("DATA: ", data)
                        this.productInfo = data;
                    });
            })
        });
    }
}
