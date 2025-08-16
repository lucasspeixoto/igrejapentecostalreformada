import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdComponent } from './ed.component';

describe('EdComponent', () => {
  let component: EdComponent;
  let fixture: ComponentFixture<EdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
