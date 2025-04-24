import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEdLessonDialogComponent } from './update-ed-lesson-dialog.component';
import { MessageService } from 'primeng/api';

describe('UpdateEdLessonDialogComponent', () => {
  let component: UpdateEdLessonDialogComponent;
  let fixture: ComponentFixture<UpdateEdLessonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateEdLessonDialogComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateEdLessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
