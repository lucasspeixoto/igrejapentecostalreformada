import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

export type EdLessonEnrollmentFormControl = {
  id: FormControl<string>;
  lessonId: FormControl<string>;
  userId: FormControl<string>;
  enrolledAt: FormControl<string>;
  status: FormControl<string>;
};

export function createEdLessonEnrollmentForm(): FormGroup<EdLessonEnrollmentFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    id: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    lessonId: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    userId: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    enrolledAt: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    status: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
}

export type EdLessonEnrollmentFormGroup = ReturnType<typeof createEdLessonEnrollmentForm>;

export type EdLessonEnrollmentFormValue = ReturnType<EdLessonEnrollmentFormGroup['getRawValue']>;
