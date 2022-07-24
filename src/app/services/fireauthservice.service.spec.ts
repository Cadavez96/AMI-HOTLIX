import { TestBed } from '@angular/core/testing';

import { FireauthserviceService } from './fireauthservice.service';

describe('FireauthserviceService', () => {
  let service: FireauthserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireauthserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
