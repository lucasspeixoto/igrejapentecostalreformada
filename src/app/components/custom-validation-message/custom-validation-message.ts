import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-custom-validation-message',
  imports: [MessageModule],
  template: `
    @if (control && control.invalid && control.dirty) {
      <ul id="messages">
        @if (control.hasError('required')) {
          <p-message
            severity="error"
            variant="simple"
            id="required"
            class="mt-[3px] flex items-start">
            Este Campo é obrigatório!
          </p-message>
        }
        @if (control.hasError('email')) {
          <p-message severity="error" variant="simple" id="email" class="mt-[3px] flex items-start">
            Endereço de E-mail inválido!
          </p-message>
        }
        @if (control.hasError('minlength') && minLength) {
          <p-message
            severity="error"
            variant="simple"
            id="minLength"
            class="mt-[3px] flex items-start">
            Este campo deve ter ao menos {{ minLength }} caracteres!
          </p-message>
        }
        @if (control.hasError('maxlength') && maxLength) {
          <p-message
            severity="error"
            variant="simple"
            id="maxLength"
            class="mt-[3px] flex items-start">
            Este campo deve ter no máximo {{ maxLength }} caracteres!
          </p-message>
        }
        @if (control.hasError('pattern')) {
          <p-message
            severity="error"
            variant="simple"
            id="pattern"
            class="mt-[3px] flex items-start">
            Padrão inválido!
          </p-message>
        }
      </ul>
    }
  `,
  styles: [
    `
      ul {
        padding: 0;
        margin: 0;
      }
    `,
  ],
})
export class CustomValidationMessageComponent {
  @Input({ required: true })
  public controlName!: string;

  @Input({ required: false })
  public minLength!: number;

  @Input({ required: false })
  public maxLength!: number;

  public controlContainer = inject(ControlContainer);

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  get control(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }
}
