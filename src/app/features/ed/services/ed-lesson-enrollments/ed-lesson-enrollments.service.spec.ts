/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { EdLessonEnrollmentsService } from './ed-lesson-enrollments.service';
import { MessageService } from 'primeng/api';

describe('EdLessonEnrollmentsService', () => {
  let service: EdLessonEnrollmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, EdLessonEnrollmentsService],
    });
    service = TestBed.inject(EdLessonEnrollmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
