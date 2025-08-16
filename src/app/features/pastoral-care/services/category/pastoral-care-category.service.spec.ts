/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PastoralCareCategoryService } from './pastoral-care-category.service';
import { MessageService } from 'primeng/api';

describe('Service: Members', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PastoralCareCategoryService, MessageService],
    });
  });

  it('should ...', inject([PastoralCareCategoryService], (service: PastoralCareCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
