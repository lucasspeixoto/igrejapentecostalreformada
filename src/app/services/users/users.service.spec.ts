/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { UsersService } from './users.service';
import { MessageService } from 'primeng/api';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, MessageService],
    });
  });

  it('should ...', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
