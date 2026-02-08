import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePastoralCareDialog } from './update-pastoral-care-dialog';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

describe('UpdatePastoralCareDialog', () => {
  let component: UpdatePastoralCareDialog;
  let fixture: ComponentFixture<UpdatePastoralCareDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePastoralCareDialog],
      providers: [MessageService, DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePastoralCareDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
