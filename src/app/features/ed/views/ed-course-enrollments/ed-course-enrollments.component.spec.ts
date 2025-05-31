import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdCourseEnrollmentsComponent } from './ed-course-enrollments.component';
import { MessageService } from 'primeng/api';

describe('EdCourseEnrollmentsComponent', () => {
  let component: EdCourseEnrollmentsComponent;
  let fixture: ComponentFixture<EdCourseEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdCourseEnrollmentsComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(EdCourseEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
