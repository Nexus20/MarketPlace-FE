import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopViewProductComponent} from './shop-view-product.component';

describe('ShopViewProductComponent', () => {
    let component: ShopViewProductComponent;
    let fixture: ComponentFixture<ShopViewProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShopViewProductComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ShopViewProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
