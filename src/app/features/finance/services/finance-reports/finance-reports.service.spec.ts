/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FinanceReportsService } from './finance-reports.service';
import { MessageService } from 'primeng/api';

describe('Service: Members', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceReportsService, MessageService],
    });
  });

  it('should ...', inject([FinanceReportsService], (service: FinanceReportsService) => {
    expect(service).toBeTruthy();
  }));
});
