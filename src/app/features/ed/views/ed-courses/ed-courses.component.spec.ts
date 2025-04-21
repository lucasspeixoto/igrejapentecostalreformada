import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdCoursesComponent } from './ed-courses.component';

describe('EdCoursesComponent', () => {
  let component: EdCoursesComponent;
  let fixture: ComponentFixture<EdCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
