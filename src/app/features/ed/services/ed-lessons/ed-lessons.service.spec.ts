/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { EdLessonsService } from './ed-lessons.service';
import { MessageService } from 'primeng/api';

describe('EdLessonsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdLessonsService, MessageService],
    });
  });

  it('should ...', inject([EdLessonsService], (service: EdLessonsService) => {
    expect(service).toBeTruthy();
  }));
});
