import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelEdCoursesSkeletonComponent } from './user-panel-ed-courses-skeleton.component';

describe('UserPanelEdCoursesSkeletonComponent', () => {
  let component: UserPanelEdCoursesSkeletonComponent;
  let fixture: ComponentFixture<UserPanelEdCoursesSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelEdCoursesSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPanelEdCoursesSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
