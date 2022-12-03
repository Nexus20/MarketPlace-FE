import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {AuthState} from "../../users/state/auth.state";
import {Logout} from "../../users/state/auth.action";
import {Router} from "@angular/router";
import {ClearBasket} from "../../basket/state/basket.action";
import {BasketState} from "../../basket/state/basket.state";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isUserAuthenticated!: boolean;
    public isUserShop!: boolean;
    public isUserBuyer!: boolean;
    public isBasketEmpty!: boolean;

    constructor(private store: Store, private router: Router) {
    }

    ngOnInit(): void {
        const token = this.store.selectSnapshot(AuthState.token);

        if (!token) {
            this.isUserAuthenticated = false;
            this.isUserShop = false;
            this.isUserBuyer = false;
            this.isBasketEmpty = false;
            return;
        }

        this.isUserAuthenticated = true;
        this.isUserShop = this.store.selectSnapshot(AuthState.shopId) != undefined;
        this.isUserBuyer = this.store.selectSnapshot(AuthState.buyerId) != undefined;

        if (this.isUserBuyer) {
            this.isBasketEmpty = this.store.selectSnapshot(BasketState.isEmpty);
        }
    }

    logout() {
        this.store.dispatch(new Logout()).subscribe(() => {
            this.store.dispatch(new ClearBasket());
            this.isUserAuthenticated = false;
            this.isUserShop = false;
            this.isUserBuyer = false;
            this.router.navigate(['/']);
        });
    }
}
