/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { EdCourseEnrollmentsService } from './ed-course-enrollments.service';
import { MessageService } from 'primeng/api';

describe('EdCourseEnrollmentsService', () => {
  let service: EdCourseEnrollmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, EdCourseEnrollmentsService],
    });
    service = TestBed.inject(EdCourseEnrollmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
