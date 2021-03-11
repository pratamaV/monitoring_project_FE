import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIssuedComponent } from './list-issued.component';

describe('ListIssuedComponent', () => {
  let component: ListIssuedComponent;
  let fixture: ComponentFixture<ListIssuedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIssuedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
