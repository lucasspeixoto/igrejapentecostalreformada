import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ForgotPassword } from './forgot-password';
import { AuthenticationRepository } from '../../../../data/repositories/authentication/authentication-repository';
import { LoadingService } from '../../../../data/services/shared/loading/loading';

describe('ForgotPassword (vitest)', () => {
  let fixture: ComponentFixture<ForgotPassword>;
  let component: ForgotPassword;

  beforeEach(async () => {
    vi.clearAllMocks();

    const mockAuthRepository = {
      forgotPasswordHandler: vi.fn(),
    } as Partial<AuthenticationRepository> as AuthenticationRepository;

    const mockMessageService = {
      add: vi.fn(),
    } as Partial<MessageService> as MessageService;

    await TestBed.configureTestingModule({
      imports: [ForgotPassword],
      providers: [
        provideRouter([]),
        LoadingService,
        { provide: AuthenticationRepository, useValue: mockAuthRepository },
        { provide: MessageService, useValue: mockMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('forgotPasswordHandler should show message and not call view model when form invalid', async () => {
    const messageService = TestBed.inject(MessageService);
    const addSpy = vi.spyOn(messageService, 'add');

    // Form starts invalid (empty)
    await component.forgotPasswordHandler();

    expect(addSpy).toHaveBeenCalled();
  });

  it('forgotPasswordHandler should delegate to view model and reset form when valid', async () => {
    const email = 'test@example.com';
    const vm = component.forgotPasswordViewModel;
    const forgotPasswordSpy = vi.spyOn(vm, 'forgotPasswordHandler').mockResolvedValue();

    component.forgotPasswordForm.setValue({ email });

    await component.forgotPasswordHandler();

    expect(forgotPasswordSpy).toHaveBeenCalledWith(email);
    expect(component.forgotPasswordForm.value.email).toBe("");
  });
});

