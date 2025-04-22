import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEdCourseDialogComponent } from './update-ed-course-dialog.component';
import { MessageService } from 'primeng/api';

describe('UpdateEdCourseDialogComponent', () => {
  let component: UpdateEdCourseDialogComponent;
  let fixture: ComponentFixture<UpdateEdCourseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateEdCourseDialogComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateEdCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
