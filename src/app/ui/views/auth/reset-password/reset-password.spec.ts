import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ResetPassword } from './reset-password';
import { AuthenticationRepository } from '../../../../data/repositories/authentication/authentication-repository';
import { LoadingService } from '../../../../data/services/shared/loading/loading';

describe('ResetPassword (vitest)', () => {
  let fixture: ComponentFixture<ResetPassword>;
  let component: ResetPassword;

  beforeEach(async () => {
    vi.clearAllMocks();

    const mockAuthRepository = {
      resetPasswordHandler: vi.fn(),
      getUser: vi.fn(),
    } as Partial<AuthenticationRepository> as AuthenticationRepository;

    const mockMessageService = {
      add: vi.fn(),
    } as Partial<MessageService> as MessageService;

    await TestBed.configureTestingModule({
      imports: [ResetPassword],
      providers: [
        provideRouter([]),
        LoadingService,
        { provide: AuthenticationRepository, useValue: mockAuthRepository },
        { provide: MessageService, useValue: mockMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resetPasswordHandler should delegate to view model and reset form', async () => {
    const password = 'new-password';
    const vm = component.resetPasswordViewModel;
    const resetPasswordSpy = vi.spyOn(vm, 'resetPasswordHandler').mockResolvedValue();

    component.resetPasswordForm.setValue({ password });

    await component.resetPasswordHandler();

    expect(resetPasswordSpy).toHaveBeenCalledWith(password);
    expect(component.resetPasswordForm.value.password).toBe("");
  });
});

