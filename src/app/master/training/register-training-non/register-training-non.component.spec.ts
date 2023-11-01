import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTrainingNonComponent } from './register-training-non.component';

describe('RegisterTrainingNonComponent', () => {
  let component: RegisterTrainingNonComponent;
  let fixture: ComponentFixture<RegisterTrainingNonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTrainingNonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTrainingNonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
