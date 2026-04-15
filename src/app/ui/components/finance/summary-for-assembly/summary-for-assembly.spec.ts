import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryForAssembly } from './summary-for-assembly';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LayoutService } from '../../../../data/services/shared/layout';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { PLATFORM_ID, signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

interface ChartLikeData {
  labels: string[];
  datasets: { data: number[] }[];
}

interface MonthChangeEvent {
  value: string;
}

if (typeof window !== 'undefined') {
  window.HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn(),
    putImageData: vi.fn(),
    createImageData: vi.fn(),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    measureText: vi.fn().mockReturnValue({ width: 0 }),
    transform: vi.fn(),
    rect: vi.fn(),
    clip: vi.fn(),
  } as unknown as CanvasRenderingContext2D);
}

describe('SummaryForAssembly', () => {
  let component: SummaryForAssembly;
  let fixture: ComponentFixture<SummaryForAssembly>;

  const mockLayoutService = {
    transitionComplete: signal(true),
  };

  const mockFinanceNotesViewModel = {
    getAllDebitNotesData: vi.fn().mockReturnValue([
      { name: 'Cat 1', total: 100 },
      { name: 'Cat 2', total: 200 },
    ]),
    getAllFinanceNotesDataHandler: vi.fn(),
    totalOfOrganicNotes: vi.fn().mockReturnValue(100),
    totalOfDebitNotes: vi.fn().mockReturnValue(70),
    totalOfCreditNotes: vi.fn().mockReturnValue(30),
    totalOfCampaignNotes: vi.fn().mockReturnValue(40),
    totalOfSeminarNotes: vi.fn().mockReturnValue(10),
  };

  const mockFinanceReportsViewModel = {
    availableMonths: signal(['01/2025', '02/2025']),
    selectedMonthAndYear: signal('01/2025'),
    setSelectedMonthAndYear: vi.fn(),
    chartMonthText: signal('Janeiro 2025'),
    totalOfDebitNotes: vi.fn().mockReturnValue(70),
    getCurrentMonthBalance: vi.fn().mockReturnValue(100),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryForAssembly, NoopAnimationsModule],
      providers: [
        { provide: LayoutService, useValue: mockLayoutService },
        { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryForAssembly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chart data on init', () => {
    component.initChart();
    const data = component.chartData() as ChartLikeData;
    expect(data.labels).toEqual(['Cat 1', 'Cat 2']);
    expect(data.datasets[0].data).toEqual([100, 200]);
  });

  it('should handle month and year change', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const event: MonthChangeEvent = { value: '02/2025' };

    component.onMonthAndYearChange(event);

    expect(setItemSpy).toHaveBeenCalledWith('IPR-SISTEMA-GESTAO:CURRENT-MONTH', '02/2025');
    expect(mockFinanceReportsViewModel.setSelectedMonthAndYear).toHaveBeenCalledWith('02/2025');
    expect(mockFinanceNotesViewModel.getAllFinanceNotesDataHandler).toHaveBeenCalled();
  });
});
