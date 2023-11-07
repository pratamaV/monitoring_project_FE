import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTrainingAaComponent } from './approve-training-aa.component';

describe('ApproveTrainingAaComponent', () => {
  let component: ApproveTrainingAaComponent;
  let fixture: ComponentFixture<ApproveTrainingAaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTrainingAaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTrainingAaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
