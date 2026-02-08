import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditValidationWarnings } from './audit-validation-warnings';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuditValidationWarnings', () => {
  let component: AuditValidationWarnings;
  let fixture: ComponentFixture<AuditValidationWarnings>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuditValidationWarnings, BrowserAnimationsModule],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditValidationWarnings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
