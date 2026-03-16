import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Resumes } from './resumes';
import { describe, it, expect, beforeEach } from 'vitest';
import { Contribution } from '../../components/panel/contribution';
import { Notifications } from '../../components/panel/notifications';
import { ButtonModule } from 'primeng/button';

describe('Resumes', () => {
  let component: Resumes;
  let fixture: ComponentFixture<Resumes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resumes, Contribution, Notifications, ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Resumes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain app-contribution', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-contribution')).toBeTruthy();
  });

  it('should contain app-notifications', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-notifications')).toBeTruthy();
  });
});
