import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdCoursesComponent } from './ed-courses.component';
import { MessageService } from 'primeng/api';
import { provideRouter } from '@angular/router';
import { appRoutes } from 'src/app.routes';

describe('EdCoursesComponent', () => {
  let component: EdCoursesComponent;
  let fixture: ComponentFixture<EdCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdCoursesComponent],
      providers: [MessageService, provideRouter(appRoutes)],
    }).compileComponents();

    fixture = TestBed.createComponent(EdCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
