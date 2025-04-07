import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  ControlContainer,
  FormsModule,
  FormGroupDirective,
} from '@angular/forms';
import { CustomValidationMessageComponent } from './custom-validation-message';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomValidationMessageComponent', () => {
  let component: CustomValidationMessageComponent;
  let fixture: ComponentFixture<CustomValidationMessageComponent>;
  let formGroupDirective: FormGroupDirective;
  let testForm: FormGroup;

  beforeEach(() => {
    testForm = new FormGroup({
      testField: new FormControl(''),
    });

    formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = testForm;

    TestBed.configureTestingModule({
      imports: [
        CustomValidationMessageComponent,
        BrowserAnimationsModule,
        MessageModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: ControlContainer, useValue: formGroupDirective }],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomValidationMessageComponent);
    component = fixture.componentInstance;

    component.controlName = 'testField';
    component.minLength = 3;
    component.maxLength = 10;

    fixture.detectChanges();
  });

  afterEach(() => {
    // Reset form state after each test
    testForm.reset();
    testForm.markAsPristine();
    testForm.markAsUntouched();

    component.control.clearValidators();
    component.control.updateValueAndValidity();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get form control correctly', () => {
    expect(component.control).toBeDefined();
    expect(component.control).toBeInstanceOf(FormControl);
  });

  it('should show required error message', () => {
    component.control.setValidators([Validators.required]);
    component.control.updateValueAndValidity();
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelectorAll('#messages');
    const requiredElement = fixture.nativeElement.querySelector('#required');
    expect(errorMessages.length).toBe(1);
    expect(requiredElement.textContent).toContain('Este Campo é obrigatório!');
  });

  it('should show email error message', () => {
    component.control.setValidators([Validators.email]);
    component.control.updateValueAndValidity();
    component.control.setValue('invalid-email');
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelectorAll('#messages');
    const emailLiElement = fixture.nativeElement.querySelector('#email');
    expect(errorMessages.length).toBe(1);
    expect(emailLiElement.textContent).toContain('Endereço de E-mail inválido!');
  });

  it('should show minlength error message', () => {
    component.control.setValidators([Validators.minLength(3)]);
    component.control.updateValueAndValidity();
    component.control.setValue('ab');
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelectorAll('#messages');
    const minLengthElement = fixture.nativeElement.querySelector('#minLength');
    expect(errorMessages.length).toBe(1);
    expect(minLengthElement.textContent).toContain('Este campo deve ter ao menos 3 caracteres!');
  });

  it('should show maxlength error message', () => {
    component.control.setValidators([Validators.maxLength(10)]);
    component.control.updateValueAndValidity();
    component.control.setValue('toolongvalue');
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelectorAll('#messages');
    const maxLengthElement = fixture.nativeElement.querySelector('#maxLength');
    expect(errorMessages.length).toBe(1);
    expect(maxLengthElement.textContent).toContain('Este campo deve ter no máximo 10 caracteres!');
  });

  it('should show pattern error message', () => {
    component.control.setValidators([Validators.pattern('^[a-z]+$')]);
    component.control.updateValueAndValidity();
    component.control.setValue('INVALID FIELD');
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelectorAll('#messages');
    const patternLengthElement = fixture.nativeElement.querySelector('#pattern');
    expect(errorMessages.length).toBe(1);
    expect(patternLengthElement.textContent).toContain('Padrão inválido!');
  });
});
