import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

export type PastoralCareFormControl = {
  id: FormControl<string>;
  typeId: FormControl<number>;
  date: FormControl<string>;
  memberId: FormControl<number>;
  pastor: FormControl<string>;
  description: FormControl<string>;
};

export function createPastoralCareForm(): FormGroup<PastoralCareFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    id: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    typeId: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    date: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    memberId: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    pastor: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(256)],
      nonNullable: true,
    }),
  });
}

export type PastoralCareFormGroup = ReturnType<typeof createPastoralCareForm>;

export type PastoralCareFormValue = ReturnType<PastoralCareFormGroup['getRawValue']>;
