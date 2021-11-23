import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailAdvertisementComponent } from './book-detail-advertisement.component';

describe('BookDetailAdvertisementComponent', () => {
  let component: BookDetailAdvertisementComponent;
  let fixture: ComponentFixture<BookDetailAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailAdvertisementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
