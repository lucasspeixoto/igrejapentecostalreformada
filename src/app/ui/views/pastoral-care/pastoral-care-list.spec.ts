import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PastoralCareList } from './pastoral-care-list';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PastoralCareViewModel } from '../../view-models/pastoral-care/pastoral-care.view-model';
import { PastoralCareCategoriesRepository } from '../../../data/repositories/pastoral-care-categories/pastoral-care-categories-repository';
import { ExcelService } from '../../../data/services/shared/excel';
import { DatePipe } from '@angular/common';
import { signal } from '@angular/core';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';

vi.stubGlobal('ResizeObserver', class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
});

describe('PastoralCareList', () => {
  let component: PastoralCareList;
  let fixture: ComponentFixture<PastoralCareList>;

  const routerEventsSubject = new Subject<any>();

  const mockPastoralCareViewModel = {
    findAll: vi.fn().mockResolvedValue(undefined),
    deletePastoralCare: vi.fn(),
    deletePastoralCares: vi.fn(),
    savePastoralCare: vi.fn(),
    checkUpdateMemberForm: vi.fn(),
    pastoralCare: signal([]),
    totalOfPastoralCare: signal(0),
  };

  const mockRouter = {
    events: routerEventsSubject.asObservable(),
    url: '/test/route',
    isActive: vi.fn().mockReturnValue(false),
    createUrlTree: vi.fn().mockReturnValue({}),
    serializeUrl: vi.fn().mockReturnValue(''),
    routerState: {
      root: {}
    }
  };

  const mockPastoralCareCategoriesRepository = {
    findAll: vi.fn().mockResolvedValue(undefined),
    categories: signal([]),
  };

  const mockConfirmationService = {
    confirm: vi.fn(),
    requireConfirmation$: new Subject<any>().asObservable(),
  };

  const mockExcelService = {
    exportToExcel: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastoralCareList, DatePipe],
      providers: [
        { provide: PastoralCareViewModel, useValue: mockPastoralCareViewModel },
        { provide: PastoralCareCategoriesRepository, useValue: mockPastoralCareCategoriesRepository },
        { provide: ConfirmationService, useValue: mockConfirmationService },
        { provide: ExcelService, useValue: mockExcelService },
        MessageService,
        DatePipe,
      ],
    }).overrideComponent(PastoralCareList, {
      set: {
        providers: [
          { provide: PastoralCareViewModel, useValue: mockPastoralCareViewModel },
          { provide: ConfirmationService, useValue: mockConfirmationService },
          { provide: ExcelService, useValue: mockExcelService },
          MessageService,
          DatePipe,
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(PastoralCareList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initialization methods on ngOnInit', () => {
    expect(mockPastoralCareViewModel.findAll).toHaveBeenCalled();
    expect(mockPastoralCareCategoriesRepository.findAll).toHaveBeenCalled();
  });

  it('should open insert dialog', () => {
    component.openInsertPastoralCare();
    expect(component.mode()).toBe('add');
    expect(component.dialog).toBe(true);
  });

  it('should call excel service on export', () => {
    component.exportCSV();
    expect(mockExcelService.exportToExcel).toHaveBeenCalled();
  });

  it('should call confirmation service on delete', () => {
    const care = { id: '1', pastor: 'Pastor A' } as any;
    component.openDeletePastoralCare(care);
    expect(mockConfirmationService.confirm).toHaveBeenCalled();
  });

  it('should save pastoral care', () => {
    component.pastoralCareForm.patchValue({
      id: '1',
      typeId: 1,
      date: '2026-03-16',
      memberId: 1,
      pastor: 'Pastor A',
      description: 'Test Description'
    });
    component.savePastoralCareHandler();
    expect(mockPastoralCareViewModel.checkUpdateMemberForm).toHaveBeenCalled();
    expect(mockPastoralCareViewModel.savePastoralCare).toHaveBeenCalled();
  });
});
