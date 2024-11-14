import { TestBed } from '@angular/core/testing';

import { SupabasedataService } from './supabasedata.service';

describe('SupabasedataService', () => {
  let service: SupabasedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabasedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
