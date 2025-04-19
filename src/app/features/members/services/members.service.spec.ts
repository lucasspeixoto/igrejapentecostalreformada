/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MembersService } from './members.service';
import { MessageService } from 'primeng/api';

describe('Service: Members', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembersService, MessageService],
    });
  });

  it('should ...', inject([MembersService], (service: MembersService) => {
    expect(service).toBeTruthy();
  }));
});
