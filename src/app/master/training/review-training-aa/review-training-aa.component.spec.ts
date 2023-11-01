import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewTrainingAaComponent } from './review-training-aa.component';

describe('ReviewTrainingAaComponent', () => {
  let component: ReviewTrainingAaComponent;
  let fixture: ComponentFixture<ReviewTrainingAaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTrainingAaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTrainingAaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
