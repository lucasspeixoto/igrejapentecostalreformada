import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberDialogComponent } from './update-member-dialog.component';

describe('UpdateMemberDialogComponent', () => {
  let component: UpdateMemberDialogComponent;
  let fixture: ComponentFixture<UpdateMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMemberDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
