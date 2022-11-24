import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxsModule} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {CategoriesState} from "./categories/categories.state";
import {CategoryService} from "./categories/category.service";
import {ShopService} from "./shops/shop.service";
import {ShopsState} from "./shops/state/shops.state";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthState} from "./users/state/auth.state";
import {UserService} from "./users/user.service";
import {InterceptorModule} from "./core/interceptors/interceptor.module";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {JwtModule} from "@auth0/angular-jwt";
import {ProductService} from "./products/product.service";
import {ProductsState} from "./products/state/products.state";

export function tokenGetter() {
    return localStorage.getItem("token");
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        InterceptorModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([CategoriesState, ShopsState, AuthState, ProductsState]),
        NgxsStoragePluginModule.forRoot({
            key: ['auth'],
        }),
        NgxsLoggerPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ["localhost:7229"],
            }
        })
    ],
    providers: [CategoryService, ShopService, UserService, ProductService],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private readonly router: Router,) {
        // router.events.subscribe(console.log)
    }
}
