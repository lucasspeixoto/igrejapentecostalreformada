import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdUserPanelComponent } from './ed-user-panel.component';

describe('EdUserPanelComponent', () => {
  let component: EdUserPanelComponent;
  let fixture: ComponentFixture<EdUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdUserPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
