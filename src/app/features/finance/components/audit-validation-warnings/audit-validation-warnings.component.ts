import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';

@Component({
  selector: 'app-audit-validation-warnings',
  imports: [MessageModule],
  template: `
    <div class="flex w-full justify-start gap-4 my-4">
      <p-message class="w-1/2" [severity]="numberOfNonCheckedNotes() === 0 ? 'success' : 'warn'">
        Notas não conferidas:
        @if (numberOfNonCheckedNotes() === 0) {
          <p class="mx-2 font-extrabold">
            Nenhuma
            @if (!isSelectedMonthClosed) {
              <span>(Pronto para fechamento)</span>
            }
          </p>
        } @else {
          <p class="mx-2 font-extrabold">{{ numberOfNonCheckedNotes() }}</p>
        }
      </p-message>
      <p-message class="w-1/2" [severity]="numberOfPendingNotes() === 0 ? 'success' : 'warn'">
        Notas pendentes:
        @if (numberOfPendingNotes() === 0) {
          <p class="mx-2 font-extrabold">
            Nenhuma
            @if (!isSelectedMonthClosed) {
              <span>(Pronto para fechamento)</span>
            }
          </p>
        } @else {
          <p class="mx-2 font-extrabold">{{ numberOfPendingNotes() }}</p>
        }
      </p-message>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditValidationWarningsComponent {
  public isSelectedMonthClosed = input<boolean>();

  public financeNotesService = inject(FinanceNotesService);

  public numberOfNonCheckedNotes = computed(
    () => this.financeNotesService.financeNotes().filter(item => item.is_checked === false).length
  );

  public numberOfPendingNotes = computed(
    () => this.financeNotesService.financeNotes().filter(item => item.value === 0).length
  );
}
