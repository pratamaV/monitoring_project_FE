import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingNonComponent } from './edit-training-non.component';

describe('EditTrainingNonComponent', () => {
  let component: EditTrainingNonComponent;
  let fixture: ComponentFixture<EditTrainingNonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTrainingNonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrainingNonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
