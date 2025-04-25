/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { EdCoursesService } from './ed-courses.service';
import { MessageService } from 'primeng/api';

describe('EdCoursesService', () => {
  let service: EdCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, EdCoursesService],
    });
    service = TestBed.inject(EdCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
