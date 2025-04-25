import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdLessonEnrollmentsComponent } from './ed-lesson-enrollments.component';
import { MessageService } from 'primeng/api';

describe('EdLessonEnrollmentsComponent', () => {
  let component: EdLessonEnrollmentsComponent;
  let fixture: ComponentFixture<EdLessonEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdLessonEnrollmentsComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(EdLessonEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
