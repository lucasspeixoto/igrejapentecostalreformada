import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notfound } from './notfound';
import { describe, it, expect, beforeEach } from 'vitest';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

describe('Notfound', () => {
  let component: Notfound;
  let fixture: ComponentFixture<Notfound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notfound, RouterModule.forRoot([]), ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Notfound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 404 message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text-primary.font-bold.text-3xl')?.textContent).toBe('404');
    expect(compiled.querySelector('h1')?.textContent).toContain('Página Não encontrada');
  });

  it('should have a link back to dashboard', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('p-button');
    expect(button?.getAttribute('routerLink')).toBe('/plataforma-ipr/painel');
  });
});
