import { TestBed } from '@angular/core/testing';

import { IonicComponentsService } from './ionic-components.service';

describe('IonicComponentsService', () => {
  let service: IonicComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
