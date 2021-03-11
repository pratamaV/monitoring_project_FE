import { TestBed } from '@angular/core/testing';

import { IssuedService } from './issued.service';

describe('IssuedService', () => {
  let service: IssuedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
