import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelEdCoursesComponent } from './user-panel-ed-courses.component';
import { MessageService } from 'primeng/api';

describe('UserPanelEdCoursesComponent', () => {
  let component: UserPanelEdCoursesComponent;
  let fixture: ComponentFixture<UserPanelEdCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelEdCoursesComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPanelEdCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
