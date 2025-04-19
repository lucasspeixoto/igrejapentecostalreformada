import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

type FinanceNoteFormControl = {
  id: FormControl<string>;
  value: FormControl<number>;
  date: FormControl<string>;
  type: FormControl<string>;
  category: FormControl<string>;
  member: FormControl<string | null>;
  description: FormControl<string>;
};

export function createFinanceNoteForm(): FormGroup<FinanceNoteFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    id: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    type: new FormControl('D', {
      validators: [Validators.required, Validators.maxLength(1)],
      nonNullable: true,
    }),
    value: new FormControl(0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    date: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    category: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    member: new FormControl('', {
      validators: [],
      nonNullable: false,
    }),
    description: new FormControl('', {
      validators: [Validators.min(3)],
      nonNullable: true,
    }),
  });
}

export type FinanceNoteFormGroup = ReturnType<typeof createFinanceNoteForm>;

export type FinanceNoteFormValue = ReturnType<FinanceNoteFormGroup['getRawValue']>;
