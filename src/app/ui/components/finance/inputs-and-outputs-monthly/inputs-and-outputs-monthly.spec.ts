import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputsAndOutputsMontlhy } from './inputs-and-outputs-monthly';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LayoutService } from '../../../../data/services/shared/layout';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { PLATFORM_ID, signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
  }) as any;
}

describe('InputsAndOutputsMontlhy', () => {
  let component: InputsAndOutputsMontlhy;
  let fixture: ComponentFixture<InputsAndOutputsMontlhy>;

  const mockLayoutService = {
    transitionComplete: signal(true),
  };

  const mockFinanceNotesViewModel = {
    getAllFinanceNotesDataHandler: vi.fn(),
  };

  const mockFinanceReportsViewModel = {
    availableMonths: signal(['01/2025', '02/2025']),
    selectedMonthAndYear: signal('01/2025'),
    totalOfCreditNotes: signal(1000),
    totalOfDebitNotes: signal(500),
    setSelectedMonthAndYear: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputsAndOutputsMontlhy, NoopAnimationsModule],
      providers: [
        { provide: LayoutService, useValue: mockLayoutService },
        { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputsAndOutputsMontlhy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chart data on init', () => {
    component.initChart();
    const data = component.chartData() as any;
    expect(data.labels).toEqual(['Entradas', 'Saídas']);
    expect(data.datasets[0].data).toEqual([1000, 500]);
  });

  it('should handle month and year change', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const event = { value: '02/2025' } as any;
    
    component.onMonthAndYearChange(event);
    
    expect(setItemSpy).toHaveBeenCalledWith('IPR-SISTEMA-GESTAO:CURRENT-MONTH', '02/2025');
    expect(mockFinanceReportsViewModel.setSelectedMonthAndYear).toHaveBeenCalledWith('02/2025');
    expect(mockFinanceNotesViewModel.getAllFinanceNotesDataHandler).toHaveBeenCalled();
  });
});
