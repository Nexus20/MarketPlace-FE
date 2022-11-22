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
import {ShopsState} from "./shops/shops.state";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthState} from "./users/state/auth.state";
import {UserService} from "./users/user.service";
import {InterceptorModule} from "./core/interceptors/interceptor.module";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        InterceptorModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([CategoriesState, ShopsState, AuthState]),
        NgxsStoragePluginModule.forRoot({
            key: ['auth'],
        }),
        NgxsLoggerPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    providers: [CategoryService, ShopService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private readonly router: Router,) {
        // router.events.subscribe(console.log)
    }
}
