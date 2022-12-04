import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerProfileOrdersComponent } from './buyer-profile-orders.component';

describe('BuyerProfileOrdersComponent', () => {
  let component: BuyerProfileOrdersComponent;
  let fixture: ComponentFixture<BuyerProfileOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerProfileOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerProfileOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
