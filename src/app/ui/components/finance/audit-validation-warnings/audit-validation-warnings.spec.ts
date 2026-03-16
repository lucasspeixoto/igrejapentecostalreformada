import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditValidationWarnings } from './audit-validation-warnings';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import { signal } from '@angular/core';

describe('AuditValidationWarnings', () => {
  let component: AuditValidationWarnings;
  let fixture: ComponentFixture<AuditValidationWarnings>;

  const mockFinanceReportsViewModel = {
    isSelectedMonthClosed: signal(false),
  };

  const mockFinanceNotesViewModel = {
    financeNotes: signal([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditValidationWarnings],
      providers: [
        { provide: FinanceReportsViewModel, useValue: mockFinanceReportsViewModel },
        { provide: FinanceNotesViewModel, useValue: mockFinanceNotesViewModel },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditValidationWarnings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate numberOfNonCheckedNotes correctly', () => {
    mockFinanceNotesViewModel.financeNotes.set([
      { is_checked: false, value: 10 },
      { is_checked: true, value: 20 },
      { is_checked: false, value: 30 },
    ] as any);
    
    fixture.detectChanges();
    expect(component.numberOfNonCheckedNotes()).toBe(2);
  });

  it('should calculate numberOfPendingNotes correctly', () => {
    mockFinanceNotesViewModel.financeNotes.set([
      { is_checked: true, value: 0 },
      { is_checked: true, value: 20 },
      { is_checked: true, value: 0 },
    ] as any);
    
    fixture.detectChanges();
    expect(component.numberOfPendingNotes()).toBe(2);
  });

  it('should show "Nenhuma" when no non-checked notes', () => {
    mockFinanceNotesViewModel.financeNotes.set([{ is_checked: true, value: 10 }] as any);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Nenhuma');
  });

  it('should show count when there are non-checked notes', () => {
    mockFinanceNotesViewModel.financeNotes.set([{ is_checked: false, value: 10 }] as any);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const messagePart = compiled.querySelector('p-message:first-child')?.textContent;
    expect(messagePart).not.toContain('Nenhuma');
    expect(messagePart).toContain('1');
  });
});
