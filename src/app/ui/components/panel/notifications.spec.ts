import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notifications } from './notifications';
import { describe, it, expect, beforeEach } from 'vitest';
import { ButtonModule } from 'primeng/button';

describe('Notifications', () => {
  let component: Notifications;
  let fixture: ComponentFixture<Notifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notifications, ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Notifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "Notícias" header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.font-semibold.text-xl')?.textContent).toBe('Notícias');
  });

  it('should display at least one notification item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li').length).toBeGreaterThan(0);
  });

  it('should display the correct date for the first notification', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('03/02/2026');
  });
});
