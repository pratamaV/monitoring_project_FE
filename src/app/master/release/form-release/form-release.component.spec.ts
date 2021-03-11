import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReleaseComponent } from './form-release.component';

describe('FormReleaseComponent', () => {
  let component: FormReleaseComponent;
  let fixture: ComponentFixture<FormReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
