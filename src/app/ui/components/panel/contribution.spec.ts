import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contribution } from './contribution';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Contribution', () => {
  let component: Contribution;
  let fixture: ComponentFixture<Contribution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contribution],
    }).compileComponents();

    fixture = TestBed.createComponent(Contribution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the Pix key', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('48652724000146');
  });

  it('should have the correct Pix key (CNPJ) label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const label = compiled.querySelector('span.text-primary');
    expect(label?.textContent).toContain('Chave Pix (CNPJ)');
  });

  it('should display the contact email', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('igrejapentecostalreformada@gmail.com');
  });
});
