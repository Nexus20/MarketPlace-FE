import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import {IAuthState} from "./auth.model";
import {Login} from "./auth.action";
import {UserService} from "../user.service";

@State<IAuthState>({
    name: 'auth',
    defaults: {
        token: '',
        email: ''
    }
})
@Injectable()
export class AuthState {

    @Selector()
    static token(state: IAuthState) {
        return state.token;
    }

    constructor(private authService: UserService) {}

    @Action(Login)
    login({ patchState }: StateContext<IAuthState>, { payload }: Login) {
        return this.authService.login(payload.email, payload.password)
            .pipe(tap(({ token }) => {
                patchState({
                    email: payload.email,
                    token
                })
            }));
    }
}
