import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTrainingComponent } from './review-training.component';

describe('ReviewTrainingComponent', () => {
  let component: ReviewTrainingComponent;
  let fixture: ComponentFixture<ReviewTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
