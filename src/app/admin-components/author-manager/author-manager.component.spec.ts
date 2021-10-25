import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorManagerComponent } from './author-manager.component';

describe('AuthorManagerComponent', () => {
  let component: AuthorManagerComponent;
  let fixture: ComponentFixture<AuthorManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
