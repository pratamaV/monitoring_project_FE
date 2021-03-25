import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitHomeComponent } from './fit-home.component';

describe('FitHomeComponent', () => {
  let component: FitHomeComponent;
  let fixture: ComponentFixture<FitHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
