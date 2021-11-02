import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSoldComponent } from './top-sold.component';

describe('TopSoldComponent', () => {
  let component: TopSoldComponent;
  let fixture: ComponentFixture<TopSoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
