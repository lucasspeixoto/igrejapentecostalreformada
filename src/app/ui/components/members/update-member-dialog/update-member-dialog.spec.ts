import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMemberDialog } from './update-member-dialog';

describe('UpdateMemberDialog', () => {
  let component: UpdateMemberDialog;
  let fixture: ComponentFixture<UpdateMemberDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMemberDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateMemberDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
