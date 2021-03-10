import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReleaseComponent } from './list-release.component';

describe('ListReleaseComponent', () => {
  let component: ListReleaseComponent;
  let fixture: ComponentFixture<ListReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
