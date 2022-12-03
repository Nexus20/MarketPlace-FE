import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopCreateProductComponent} from './shop-create-product.component';

describe('CreateProductComponent', () => {
    let component: ShopCreateProductComponent;
    let fixture: ComponentFixture<ShopCreateProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShopCreateProductComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ShopCreateProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
