/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PastoralCareService } from './pastoral-care.service';
import { MessageService } from 'primeng/api';

describe('Service: Members', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PastoralCareService, MessageService],
    });
  });

  it('should ...', inject([PastoralCareService], (service: PastoralCareService) => {
    expect(service).toBeTruthy();
  }));
});
