import { TestBed } from '@angular/core/testing';

import { SupabaseauthService } from './supabaseauth.service';

describe('SupabaseauthService', () => {
  let service: SupabaseauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
