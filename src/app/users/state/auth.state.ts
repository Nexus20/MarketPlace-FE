import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import {IAuthState} from "./auth.model";
import {Login} from "./auth.action";
import {UserService} from "../user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@State<IAuthState>({
    name: 'auth',
    defaults: {
        token: '',
        email: '',
        shopId: undefined,
        buyerId: undefined
    }
})
@Injectable()
export class AuthState {

    @Selector()
    static shopId(state: IAuthState) {
        return state.shopId;
    }

    @Selector()
    static token(state: IAuthState) {
        return state.token;
    }

    constructor(private authService: UserService, private jwtHelper: JwtHelperService) {}

    @Action(Login)
    login({ patchState }: StateContext<IAuthState>, { payload }: Login) {
        return this.authService.login(payload.email, payload.password)
            .pipe(tap(({ token }) => {

                const decodedToken = this.decodeToken(token);

                patchState({
                    email: payload.email,
                    token,
                    buyerId: decodedToken["BuyerId"],
                    shopId: decodedToken["ShopId"]
                })
            }));
    }

    private decodeToken(token: string) : any {
        return this.jwtHelper.decodeToken(token);
    }
}
