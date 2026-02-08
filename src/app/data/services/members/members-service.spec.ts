import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { MembersService } from './members-service';
import { SupabaseService } from '../shared/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Member } from '../../../domain/models/members.model';

describe('MembersService', () => {
  let service: MembersService;
  const mockFrom = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockSupabaseClient = {
      from: mockFrom,
    } as Partial<SupabaseClient>;

    TestBed.configureTestingModule({
      providers: [
        MembersService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: (): Partial<SupabaseClient> => mockSupabaseClient,
          },
        },
      ],
    });

    service = TestBed.inject(MembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findAll should query members ordered by name ascending', async () => {
    const mockResponse = { data: [], error: null };

    const order = vi.fn().mockResolvedValue(mockResponse);
    const select = vi.fn().mockReturnValue({ order });
    mockFrom.mockReturnValue({ select });

    const result = await service.findAll();

    expect(mockFrom).toHaveBeenCalledWith('members');
    expect(select).toHaveBeenCalledWith('*');
    expect(order).toHaveBeenCalledWith('name', { ascending: true });
    expect(result).toBe(mockResponse);
  });

  it('saveMember should insert member into members table', async () => {
    const member = { name: 'John Doe' } as Member;
    const mockResponse = { data: null, error: null };

    const insert = vi.fn().mockResolvedValue(mockResponse);
    mockFrom.mockReturnValue({ insert });

    const result = await service.saveMember(member);

    expect(mockFrom).toHaveBeenCalledWith('members');
    expect(insert).toHaveBeenCalledWith([member]);
    expect(result).toBe(mockResponse);
  });

  it('updateMember should update member in members table by number', async () => {
    const member = { name: 'Jane Doe', number: 123 } as Member;
    const memberId = 123;
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const update = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ update });

    const result = await service.updateMember(member, memberId);

    expect(mockFrom).toHaveBeenCalledWith('members');
    expect(update).toHaveBeenCalledWith([member]);
    expect(eq).toHaveBeenCalledWith('number', memberId);
    expect(result).toBe(mockResponse);
  });

  it('deleteMember should delete member from members table by number', async () => {
    const memberNumber = 456;
    const mockResponse = { data: null, error: null };

    const eq = vi.fn().mockResolvedValue(mockResponse);
    const del = vi.fn().mockReturnValue({ eq });
    mockFrom.mockReturnValue({ delete: del });

    const result = await service.deleteMember(memberNumber);

    expect(mockFrom).toHaveBeenCalledWith('members');
    expect(del).toHaveBeenCalled();
    expect(eq).toHaveBeenCalledWith('number', memberNumber);
    expect(result).toBe(mockResponse);
  });

  it('deleteMembers should delete members from members table by numbers array', async () => {
    const memberNumbers = [1, 2, 3];
    const mockResponse = { data: null, error: null };

    const inFn = vi.fn().mockResolvedValue(mockResponse);
    const del = vi.fn().mockReturnValue({ in: inFn });
    mockFrom.mockReturnValue({ delete: del });

    const result = await service.deleteMembers(memberNumbers);

    expect(mockFrom).toHaveBeenCalledWith('members');
    expect(del).toHaveBeenCalled();
    expect(inFn).toHaveBeenCalledWith('number', [...memberNumbers]);
    expect(result).toBe(mockResponse);
  });
});

