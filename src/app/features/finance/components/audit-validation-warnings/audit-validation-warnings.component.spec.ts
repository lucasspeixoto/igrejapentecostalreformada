import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditValidationWarningsComponent } from './audit-validation-warnings.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuditValidationWarningsComponent', () => {
  let component: AuditValidationWarningsComponent;
  let fixture: ComponentFixture<AuditValidationWarningsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuditValidationWarningsComponent, BrowserAnimationsModule],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditValidationWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
