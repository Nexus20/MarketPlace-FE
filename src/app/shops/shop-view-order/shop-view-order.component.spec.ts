import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopViewOrderComponent} from './shop-view-order.component';

describe('ShopViewOrderComponent', () => {
    let component: ShopViewOrderComponent;
    let fixture: ComponentFixture<ShopViewOrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShopViewOrderComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ShopViewOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
