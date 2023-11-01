import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrainingNonComponent } from './list-training-non.component';

describe('ListTrainingNonComponent', () => {
  let component: ListTrainingNonComponent;
  let fixture: ComponentFixture<ListTrainingNonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTrainingNonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrainingNonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
