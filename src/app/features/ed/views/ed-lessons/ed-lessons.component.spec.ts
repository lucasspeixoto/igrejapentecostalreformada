import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdLessonsComponent } from './ed-lessons.component';

describe('EdLessonsComponent', () => {
  let component: EdLessonsComponent;
  let fixture: ComponentFixture<EdLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdLessonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
