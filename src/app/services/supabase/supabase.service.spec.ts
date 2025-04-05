import { TestBed } from '@angular/core/testing';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

jest.mock('@supabase/supabase-js'); // Mock the Supabase client

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupabaseService],
    });
    service = TestBed.inject(SupabaseService);

    // Mock the Supabase client methods
    const mockSupabaseClient = {
      auth: {
        signInWithPassword: jest.fn(),
        resetPasswordForEmail: jest.fn(),
        updateUser: jest.fn(),
        getSession: jest.fn(),
        signOut: jest.fn(),
      },
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn(),
          }),
        }),
      }),
    };

    service.supabase = mockSupabaseClient as unknown as SupabaseClient;
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign out the user', async () => {
    await service.signOut();
    expect(service.supabase.auth.signOut).toHaveBeenCalled();
  });
});
