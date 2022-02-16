import { TestBed } from '@angular/core/testing';

import { DotsService } from './dots.service';

describe('DotsServiceService', () => {
  let service: DotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
