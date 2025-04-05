import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-validation-message',
  template: `
    @if (control && control.invalid && control.dirty) {
      <ul id="messages">
        @if (control.hasError('required')) {
          <li id="required" class="error-message">&#9888; Este Campo é obrigatório!</li>
        }
        @if (control.hasError('email')) {
          <li id="email" class="error-message">&#9888; Endereço de E-mail inválido!</li>
        }
        @if (control.hasError('minlength') && minLength) {
          <li id="minLength" class="error-message">
            &#9888; Este campo deve ter ao menos {{ minLength }} caracteres!
          </li>
        }
        @if (control.hasError('maxlength') && maxLength) {
          <li id="maxLength" class="error-message">
            &#9888; Este campo deve ter no máximo {{ maxLength }} caracteres!
          </li>
        }
        @if (control.hasError('pattern')) {
          <li id="pattern" class="error-message">&#9888; Padrão inválido!</li>
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

      .error-message {
        color: red;
        font-size: 14px;
        margin-top: 3px;
        display: flex;
        align-items: start;
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
