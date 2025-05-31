import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { EnrollStudentsDialogComponent } from './enroll-students-dialog.component';

describe('EnrollStudentsDialogComponent', () => {
  let component: EnrollStudentsDialogComponent;
  let fixture: ComponentFixture<EnrollStudentsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EnrollStudentsDialogComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollStudentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
