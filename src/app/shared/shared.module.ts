import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import {RouterLink} from "@angular/router";


@NgModule({
    declarations: [
        NavbarComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterLink
    ],
    exports: [HeaderComponent]
})
export class SharedModule {
}
