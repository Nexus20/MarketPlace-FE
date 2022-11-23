import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {IShopResult} from "../models/IShopResult";
import {ShopsState} from "../state/shops.state";
import {GetShops} from "../state/shop.action";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

    shops!: IShopResult[];
    displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
    @Select(ShopsState.selectStateData) shopsInfo!: Observable<any>;

    constructor(private store: Store) {

        this.store.dispatch(new GetShops());
        this.shopsInfo.subscribe((returnData) => {
            this.shops = returnData;
        })
    }

    ngOnInit(): void {
    }

}
