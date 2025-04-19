/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FinanceNoteCategoryService } from './finance-note-category.service';
import { MessageService } from 'primeng/api';

describe('Service: Members', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceNoteCategoryService, MessageService],
    });
  });

  it('should ...', inject([FinanceNoteCategoryService], (service: FinanceNoteCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
