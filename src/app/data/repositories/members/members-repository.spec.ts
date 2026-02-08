import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { MembersRepository } from './members-repository';
import { MembersService } from '../../services/members/members-service';
import type { Member } from '../../../domain/models/members.model';

describe('MembersRepository', () => {
  let repo: MembersRepository;

  const findAll = vi.fn();
  const saveMember = vi.fn();
  const updateMember = vi.fn();
  const deleteMember = vi.fn();
  const deleteMembers = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        MembersRepository,
        {
          provide: MembersService,
          useValue: {
            findAll,
            saveMember,
            updateMember,
            deleteMember,
            deleteMembers,
          },
        },
      ],
    });

    repo = TestBed.inject(MembersRepository);
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('findAll should set members when no error', async () => {
    const data = [{ number: 1, name: 'A' }, { number: 2, name: 'B' }];
    findAll.mockResolvedValue({ data, error: null });

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.members()).toEqual(data);
    expect(repo.totalOfMembers()).toBe(2);
    expect(result).toEqual({ data, error: null });
  });

  it('findAll should clear members when error', async () => {
    findAll.mockResolvedValue({ data: null, error: { message: 'x' } });

    const result = await repo.findAll();

    expect(findAll).toHaveBeenCalled();
    expect(repo.members()).toEqual([]);
    expect(repo.totalOfMembers()).toBe(0);
    expect(result.error).toBeTruthy();
  });

  it('saveMember should delegate and return { data, error }', async () => {
    const member = { name: 'John' };
    saveMember.mockResolvedValue({ data: null, error: null });

    const result = await repo.saveMember(member);

    expect(saveMember).toHaveBeenCalledWith(member);
    expect(result).toEqual({ data: null, error: null });
  });

  it('updateMember should delegate and return { data, error }', async () => {
    const member = { number: 1, name: 'John' } as Member;
    updateMember.mockResolvedValue({ data: null, error: null });

    const result = await repo.updateMember(member, 1);

    expect(updateMember).toHaveBeenCalledWith(member, 1);
    expect(result).toEqual({ data: null, error: null });
  });

  it('deleteMember should delegate and return { error }', async () => {
    deleteMember.mockResolvedValue({ data: null, error: null });

    const result = await repo.deleteMember(123);

    expect(deleteMember).toHaveBeenCalledWith(123);
    expect(result).toEqual({ error: null });
  });

  it('deleteMembers should delegate and return { error }', async () => {
    deleteMembers.mockResolvedValue({ data: null, error: null });

    const result = await repo.deleteMembers([1, 2]);

    expect(deleteMembers).toHaveBeenCalledWith([1, 2]);
    expect(result).toEqual({ error: null });
  });
});

