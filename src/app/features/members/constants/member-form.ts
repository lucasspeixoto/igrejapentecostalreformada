import { inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

export type MemberFormControl = {
  number: FormControl<number>;
  name: FormControl<string>;
  birthday: FormControl<string>;
  rg: FormControl<string>;
  cpf: FormControl<string>;
  address: FormControl<string>;
  previousChurch: FormControl<string>;
  baptismDate: FormControl<string>;
  baptismChurch: FormControl<string>;
  naturality: FormControl<string>;
  cellphone: FormControl<string>;
  tellphone: FormControl<string>;
  maritalStatus: FormControl<string>;
  email: FormControl<string>;
  memberType: FormControl<string>;
};

export function createMemberForm(): FormGroup<MemberFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    number: new FormControl(0, {
      validators: [],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    birthday: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    rg: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    cpf: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    address: new FormControl('', {
      validators: [Validators.minLength(10)],
      nonNullable: true,
    }),
    previousChurch: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    baptismDate: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    baptismChurch: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    naturality: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    cellphone: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    tellphone: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    maritalStatus: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.email],
      nonNullable: true,
    }),
    memberType: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
}

export type MemberFormGroup = ReturnType<typeof createMemberForm>;

export type MemberFormValue = ReturnType<MemberFormGroup['getRawValue']>;
