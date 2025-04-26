import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelEdFiltersComponent } from './user-panel-ed-filters.component';
import { MessageService } from 'primeng/api';

describe('UserPanelEdFiltersComponent', () => {
  let component: UserPanelEdFiltersComponent;
  let fixture: ComponentFixture<UserPanelEdFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelEdFiltersComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPanelEdFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
