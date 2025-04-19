/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FinanceNotesService } from './finance-notes.service';
import { MessageService } from 'primeng/api';

describe('FinanceNotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceNotesService, MessageService],
    });
  });

  it('should ...', inject([FinanceNotesService], (service: FinanceNotesService) => {
    expect(service).toBeTruthy();
  }));
});
