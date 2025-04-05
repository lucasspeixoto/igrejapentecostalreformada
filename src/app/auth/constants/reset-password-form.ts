import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

type ResetPasswordFormControl = {
  password: FormControl<string>;
};

export function createResetPasswordForm(): FormGroup<ResetPasswordFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });
}

export type ResetPasswordFormGroup = ReturnType<typeof createResetPasswordForm>;

export type ResetPasswordFormValue = ReturnType<ResetPasswordFormGroup['getRawValue']>;
