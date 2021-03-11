import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProjectUserComponent } from './detail-project-user.component';

describe('DetailProjectUserComponent', () => {
  let component: DetailProjectUserComponent;
  let fixture: ComponentFixture<DetailProjectUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProjectUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProjectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
