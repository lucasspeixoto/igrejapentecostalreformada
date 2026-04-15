import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Members } from './members';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MembersViewModel } from './../../view-models/members/members.view-model';
import { ExcelService } from '../../../data/services/shared/excel';
import { DatePipe } from '@angular/common';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';
import type { Member } from '../../../domain/models/members.model';

function createMember(): Member {
  return {
    created_at: '2026-01-01',
    number: 1,
    name: 'John',
    birthday: '1990-01-01',
    rg: null,
    cpf: null,
    address: 'Street 1',
    baptism_date: null,
    previous_church: null,
    baptism_church: null,
    naturality: null,
    cellphone: null,
    tellphone: null,
    marital_status: 'single',
    email: null,
    member_type: 'member',
  };
}

vi.stubGlobal('ResizeObserver', class ResizeObserver {
  public observe = vi.fn();
  public unobserve = vi.fn();
  public disconnect = vi.fn();
});

describe('Members', () => {
  let component: Members;
  let fixture: ComponentFixture<Members>;

  const mockMembersViewModel = {
    findAll: vi.fn().mockResolvedValue(undefined),
    deleteMember: vi.fn(),
    deleteMembers: vi.fn(),
    saveMember: vi.fn(),
    checkUpdateMemberForm: vi.fn(),
    members: signal([]),
    totalOfMembers: signal(0),
  };

  const mockConfirmationService = {
    confirm: vi.fn(),
    requireConfirmation$: new Subject<unknown>().asObservable(),
  };

  const mockExcelService = {
    exportToExcel: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Members, DatePipe],
      providers: [
        { provide: MembersViewModel, useValue: mockMembersViewModel },
        { provide: ConfirmationService, useValue: mockConfirmationService },
        { provide: ExcelService, useValue: mockExcelService },
        MessageService,
        DatePipe,
      ],
    }).overrideComponent(Members, {
      set: {
        providers: [
          { provide: MembersViewModel, useValue: mockMembersViewModel },
          { provide: ConfirmationService, useValue: mockConfirmationService },
          { provide: ExcelService, useValue: mockExcelService },
          MessageService,
          DatePipe,
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(Members);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findAll on ngOnInit', () => {
    expect(mockMembersViewModel.findAll).toHaveBeenCalled();
  });

  it('should open insert dialog', () => {
    component.openInsertMember();
    expect(component.mode()).toBe('add');
    expect(component.memberDialog).toBe(true);
  });

  it('should call excel service on export', () => {
    component.exportCSV();
    expect(mockExcelService.exportToExcel).toHaveBeenCalled();
  });

  it('should call confirmation service on delete', () => {
    const member = createMember();
    component.openDeleteMember(member);
    expect(mockConfirmationService.confirm).toHaveBeenCalled();
  });

  it('should save member', () => {
    component.saveMemberHandler();
    expect(mockMembersViewModel.checkUpdateMemberForm).toHaveBeenCalled();
    expect(mockMembersViewModel.saveMember).toHaveBeenCalled();
  });
});
