import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import {RouterLink} from "@angular/router";
import {CarouselHolderComponent} from './carousel-holder/carousel-holder.component';
import {CarouselModule} from "ngx-owl-carousel-o";


@NgModule({
    declarations: [
        NavbarComponent,
        HeaderComponent,
        CarouselHolderComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        CarouselModule
    ],
    exports: [HeaderComponent, CarouselHolderComponent]
})
export class SharedModule {
}
