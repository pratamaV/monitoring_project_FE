import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIssuedComponent } from './form-issued.component';

describe('FormIssuedComponent', () => {
  let component: FormIssuedComponent;
  let fixture: ComponentFixture<FormIssuedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIssuedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
