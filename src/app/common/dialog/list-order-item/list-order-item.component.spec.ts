import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderItemComponent } from './list-order-item.component';

describe('ListOrderItemComponent', () => {
  let component: ListOrderItemComponent;
  let fixture: ComponentFixture<ListOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
