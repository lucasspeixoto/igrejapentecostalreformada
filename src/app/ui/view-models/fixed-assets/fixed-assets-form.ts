import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

export type FixedAssetsFormControl = {
  id: FormControl<number>;
  local: FormControl<string>;
  type: FormControl<string>;
  asset: FormControl<string>;
};

export function createFixedAssetsForm(): FormGroup<FixedAssetsFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    id: new FormControl(0, {
      validators: [],
      nonNullable: true,
    }),
    local: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    type: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    asset: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });
}

export type FixedAssetsFormGroup = ReturnType<typeof createFixedAssetsForm>;

export type FixedAssetsFormValue = ReturnType<FixedAssetsFormGroup['getRawValue']>;
