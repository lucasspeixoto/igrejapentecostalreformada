import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePastoralCareDialogComponent } from './update-pastoral-care-dialog.component';
import { MessageService } from 'primeng/api';

describe('UpdatePastoralCareDialogComponent', () => {
  let component: UpdatePastoralCareDialogComponent;
  let fixture: ComponentFixture<UpdatePastoralCareDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePastoralCareDialogComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePastoralCareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
