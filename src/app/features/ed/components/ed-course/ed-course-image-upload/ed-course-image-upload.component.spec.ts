/* eslint-disable @typescript-eslint/no-unused-vars */
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdCourseImageUploadComponent } from './ed-course-image-upload.component';
import { provideHttpClient } from '@angular/common/http';

describe('EdCourseImageUploadComponent', () => {
  let component: EdCourseImageUploadComponent;
  let fixture: ComponentFixture<EdCourseImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdCourseImageUploadComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(EdCourseImageUploadComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
