import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FixedAssets } from './fixed-assets';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FixedAssetsViewModel } from './../../view-models/fixed-assets/fixed-assets.view-model';
import { ExcelService } from '../../../data/services/shared/excel';
import { DatePipe } from '@angular/common';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';
import type { FixedAsset } from '../../../domain/models/fixed-assets.model';

function createFixedAsset(): FixedAsset {
  return {
    id: 1,
    created_at: '2026-01-01',
    updated_at: '2026-01-02',
    local: 'Main Hall',
    type: 'Furniture',
    asset: 'Table',
    user_id: 1,
    users: { full_name: 'User Test' },
  };
}

vi.stubGlobal('ResizeObserver', class ResizeObserver {
  public observe = vi.fn();
  public unobserve = vi.fn();
  public disconnect = vi.fn();
});

describe('FixedAssets', () => {
  let component: FixedAssets;
  let fixture: ComponentFixture<FixedAssets>;

  const mockFixedAssetsViewModel = {
    findAll: vi.fn().mockResolvedValue(undefined),
    deleteFixedAsset: vi.fn(),
    deleteFixedAssets: vi.fn(),
    saveFixedAsset: vi.fn(),
    checkUpdateFixedAssetForm: vi.fn(),
    fixedAssets: signal([]),
    totalOfFixedAssets: signal(0),
    findAllUsers: vi.fn().mockResolvedValue([]),
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
      imports: [FixedAssets, DatePipe],
      providers: [
        { provide: FixedAssetsViewModel, useValue: mockFixedAssetsViewModel },
        { provide: ConfirmationService, useValue: mockConfirmationService },
        { provide: ExcelService, useValue: mockExcelService },
        MessageService,
        DatePipe,
      ],
    }).overrideComponent(FixedAssets, {
      set: {
        providers: [
          { provide: FixedAssetsViewModel, useValue: mockFixedAssetsViewModel },
          { provide: ConfirmationService, useValue: mockConfirmationService },
          { provide: ExcelService, useValue: mockExcelService },
          MessageService,
          DatePipe,
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(FixedAssets);
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
    expect(mockFixedAssetsViewModel.findAll).toHaveBeenCalled();
  });

  it('should open insert dialog', () => {
    component.openInsertFixedAsset();
    expect(component.mode()).toBe('add');
    expect(component.fixedAssetsDialog).toBe(true);
  });

  it('should open edit dialog with data', () => {
    const asset = createFixedAsset();
    component.openUpdateFixedAsset(asset);
    expect(component.mode()).toBe('edit');
    expect(component.fixedAssetsForm.value.asset).toBe('Table');
    expect(component.fixedAssetsDialog).toBe(true);
  });

  it('should call confirmation service on delete', () => {
    const asset = createFixedAsset();
    component.openDeleteFixedAsset(asset);
    expect(mockConfirmationService.confirm).toHaveBeenCalled();
  });

  it('should save asset', () => {
    component.saveFixedAssetHandler();
    expect(mockFixedAssetsViewModel.checkUpdateFixedAssetForm).toHaveBeenCalled();
    expect(mockFixedAssetsViewModel.saveFixedAsset).toHaveBeenCalled();
  });
});
