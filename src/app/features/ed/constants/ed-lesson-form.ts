import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

export type EdLessonFormControl = {
  id: FormControl<string>;
  courseId: FormControl<string>;
  name: FormControl<string>;
  linkPdfFile: FormControl<string>;
  linkVideoFile: FormControl<string>;
  description: FormControl<string>;
  image: FormControl<string>;
};

export function createEdLessonForm(): FormGroup<EdLessonFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    id: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    courseId: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    linkPdfFile: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    linkVideoFile: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    image: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
  });
}

export type EdLessonFormGroup = ReturnType<typeof createEdLessonForm>;

export type EdLessonFormValue = ReturnType<EdLessonFormGroup['getRawValue']>;
