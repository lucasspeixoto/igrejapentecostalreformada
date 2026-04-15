import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditValidationWarnings } from './audit-validation-warnings';
import { describe, it, expect, beforeEach } from 'vitest';
import { FinanceReportsViewModel } from '../../../view-models/finance-reports/finance-reports.view-model';
import { FinanceNotesViewModel } from '../../../view-models/finance-notes/finance-notes.view-model';
import type { FinanceNote } from '../../../../domain/models/finance-note.model';
import { signal } from '@angular/core';

function createFinanceNote(isChecked: boolean, value: number): FinanceNote {
  return {
    id: 'note-1',
    created_at: '2026-01-01',
    user_id: 'user-1',
    member_id: 'member-1',
    type: 'D',
    value,
    date: '2026-01-01',
    description: 'Test note',
    category_id: 'category-1',
    users: { full_name: 'User Test' },
    finance_categories: { name: 'Category Test' },
    members: { name: 'Member Test' },
    is_checked: isChecked,
  };
}

describe('AuditValidationWarnings', () => {
  let component: AuditValidationWarnings;
  let fixture: ComponentFixture<AuditValidationWarnings>;

  const mockFinanceReportsViewModel = {
    isSelectedMonthClosed: signal(false),
  };

  const mockFinanceNotesViewModel = {
    financeNotes: signal<FinanceNote[]>([]),
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
      createFinanceNote(false, 10),
      createFinanceNote(true, 20),
      createFinanceNote(false, 30),
    ]);
    
    fixture.detectChanges();
    expect(component.numberOfNonCheckedNotes()).toBe(2);
  });

  it('should calculate numberOfPendingNotes correctly', () => {
    mockFinanceNotesViewModel.financeNotes.set([
      createFinanceNote(true, 0),
      createFinanceNote(true, 20),
      createFinanceNote(true, 0),
    ]);
    
    fixture.detectChanges();
    expect(component.numberOfPendingNotes()).toBe(2);
  });

  it('should show "Nenhuma" when no non-checked notes', () => {
    mockFinanceNotesViewModel.financeNotes.set([createFinanceNote(true, 10)]);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Nenhuma');
  });

  it('should show count when there are non-checked notes', () => {
    mockFinanceNotesViewModel.financeNotes.set([createFinanceNote(false, 10)]);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const messagePart = compiled.querySelector('p-message:first-child')?.textContent;
    expect(messagePart).not.toContain('Nenhuma');
    expect(messagePart).toContain('1');
  });
});
