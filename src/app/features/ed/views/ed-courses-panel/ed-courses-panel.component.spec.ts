import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdCoursesPanelComponent } from './ed-courses-panel.component';
import { MessageService } from 'primeng/api';

describe('EdCoursesPanelComponent', () => {
  let component: EdCoursesPanelComponent;
  let fixture: ComponentFixture<EdCoursesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdCoursesPanelComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(EdCoursesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
