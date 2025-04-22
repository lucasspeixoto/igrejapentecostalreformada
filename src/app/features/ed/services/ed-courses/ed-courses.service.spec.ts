/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { EdCoursesService } from './ed-courses.service';
import { MessageService } from 'primeng/api';

describe('EdCoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdCoursesService, MessageService],
    });
  });

  it('should ...', inject([EdCoursesService], (service: EdCoursesService) => {
    expect(service).toBeTruthy();
  }));
});
