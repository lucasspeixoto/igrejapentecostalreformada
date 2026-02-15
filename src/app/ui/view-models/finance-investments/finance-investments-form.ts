/* eslint-disable @typescript-eslint/naming-convention */
import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

type FinanceInvestmentFormControl = {
  id: FormControl<string>;
  value: FormControl<number>;
  reason: FormControl<string>;
  account_bank: FormControl<string>;
};

export function createInvestmentsForm(): FormGroup<FinanceInvestmentFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);
  return formBuilder.group({
    id: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    value: new FormControl(0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    reason: new FormControl('', {
      validators: [Validators.min(3)],
      nonNullable: true,
    }),
    account_bank: new FormControl('', {
      validators: [Validators.min(100)],
      nonNullable: true,
    }),
  });
}

export type FinanceInvestmentFormGroup = ReturnType<typeof createInvestmentsForm>;

export type FinanceInvestmentFormValue = ReturnType<FinanceInvestmentFormGroup['getRawValue']>;
