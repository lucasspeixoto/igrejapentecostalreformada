import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { CategoryNoteDetail } from './category-note-detail';

describe('CategoryNoteDetail', () => {
  let component: CategoryNoteDetail;
  let fixture: ComponentFixture<CategoryNoteDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryNoteDetail, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryNoteDetail);
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
