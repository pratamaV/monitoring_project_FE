import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReleaseComponent } from './detail-release.component';

describe('DetailReleaseComponent', () => {
  let component: DetailReleaseComponent;
  let fixture: ComponentFixture<DetailReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
