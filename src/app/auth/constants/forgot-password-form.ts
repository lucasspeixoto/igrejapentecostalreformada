import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

type ForgotPasswordFormControl = {
  email: FormControl<string>;
};

export function createForgotPasswordForm(): FormGroup<ForgotPasswordFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });
}

export type ForgotPasswordFormGroup = ReturnType<typeof createForgotPasswordForm>;

export type ForgotPasswordFormValue = ReturnType<ForgotPasswordFormGroup['getRawValue']>;
