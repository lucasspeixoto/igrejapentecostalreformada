/* eslint-disable @typescript-eslint/no-unused-vars */
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdLessonImageUploadComponent } from './ed-lesson-image-upload.component';
import { provideHttpClient } from '@angular/common/http';

describe('EdLessonImageUploadComponent', () => {
  let component: EdLessonImageUploadComponent;
  let fixture: ComponentFixture<EdLessonImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdLessonImageUploadComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(EdLessonImageUploadComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
