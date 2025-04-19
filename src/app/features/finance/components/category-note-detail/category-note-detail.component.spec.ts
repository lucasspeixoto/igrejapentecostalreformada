import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNoteDetailComponent } from './category-note-detail.component';
import { CommonModule } from '@angular/common';

describe('CategoryNoteDetailComponent', () => {
  let component: CategoryNoteDetailComponent;
  let fixture: ComponentFixture<CategoryNoteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryNoteDetailComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryNoteDetailComponent);
    component = fixture.componentInstance;

    component.itemColor = 'green';
    component.topFinanceNoteByCategory = {
      name: 'Luz',
      total: 855.78,
      quantity: 1,
      percent: 8.32,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
