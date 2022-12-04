import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerProfileOrderComponent } from './buyer-profile-order.component';

describe('BuyerProfileOrderComponent', () => {
  let component: BuyerProfileOrderComponent;
  let fixture: ComponentFixture<BuyerProfileOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerProfileOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerProfileOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
