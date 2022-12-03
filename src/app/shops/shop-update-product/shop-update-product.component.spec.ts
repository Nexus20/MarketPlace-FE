import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopUpdateProductComponent} from './shop-update-product.component';

describe('ShopUpdateProductComponent', () => {
    let component: ShopUpdateProductComponent;
    let fixture: ComponentFixture<ShopUpdateProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShopUpdateProductComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ShopUpdateProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
