import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

export type EdCourseFormControl = {
  id: FormControl<string>;
  userId: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string>;
  /* photo: FormControl<string>; */
};

export function createEdCourseForm(): FormGroup<EdCourseFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    id: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    userId: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    /* photo: new FormControl('', {
      validators: [],
      nonNullable: true,
    }), */
  });
}

export type EdCourseFormGroup = ReturnType<typeof createEdCourseForm>;

export type EdCourseFormValue = ReturnType<EdCourseFormGroup['getRawValue']>;
