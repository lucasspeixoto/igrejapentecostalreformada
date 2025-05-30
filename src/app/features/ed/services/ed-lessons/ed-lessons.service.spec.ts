/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { EdLessonsService } from './ed-lessons.service';
import { MessageService } from 'primeng/api';

describe('EdLessonsService', () => {
  let service: EdLessonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, EdLessonsService],
    });
    service = TestBed.inject(EdLessonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
