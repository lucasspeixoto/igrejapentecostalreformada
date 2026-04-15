import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppFooter } from './footer';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AppFooter', () => {
  let component: AppFooter;
  let fixture: ComponentFixture<AppFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render copyright text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.layout-footer span')?.textContent).toContain('Igreja Pentecostal Reformada');
  });

  it('should have a link to the website', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://www.igrejapentecostalreformada.com.br/');
    expect(link?.getAttribute('target')).toBe('_blank');
  });
});
