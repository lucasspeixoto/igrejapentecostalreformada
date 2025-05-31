import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdLessonsPanelComponent } from './ed-lessons-panel.component';
import { MessageService } from 'primeng/api';

describe('EdLessonsPanelComponent', () => {
  let component: EdLessonsPanelComponent;
  let fixture: ComponentFixture<EdLessonsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdLessonsPanelComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(EdLessonsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
