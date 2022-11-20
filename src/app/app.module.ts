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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([CategoriesState, ShopsState]), NgxsLoggerPluginModule.forRoot(), NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    providers: [CategoryService, ShopService],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private readonly router: Router,) {
        // router.events.subscribe(console.log)
    }
}
