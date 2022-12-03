import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable} from 'rxjs';
import {AuthState} from "../../users/state/auth.state";
import {environment} from "../../../environments/environment";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private readonly aspUrl = environment.api;

    constructor(private store: Store) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.url.match(this.aspUrl)) {
            const token = this.store.selectSnapshot(AuthState.token);

            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }

        return next.handle(request);
    }
}
