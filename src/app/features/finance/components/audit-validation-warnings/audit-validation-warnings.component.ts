import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { FinanceNotesService } from '../../services/finance-notes/finance-notes.service';

@Component({
  selector: 'app-audit-validation-warnings',
  imports: [MessageModule],
  template: `
    <div class="flex w-full justify-start gap-8 md:gap-4 my-4">
      <p-message class="w-1/2" [severity]="numberOfNonCheckedNotes() === 0 ? 'success' : 'warn'">
        <span class="gap-2 text-xs sm:text-sm md:text-md justify-center flex flex-col md:flex-row"
          >Não conferidas:
          @if (numberOfNonCheckedNotes() === 0) {
            <p class="font-extrabold">
              Nenhuma
              @if (!isSelectedMonthClosed()) {
                <span>(Pronto para fechamento)</span>
              }
            </p>
          } @else {
            <p class="font-extrabold">{{ numberOfNonCheckedNotes() }}</p>
          }
        </span>
      </p-message>
      <p-message class="w-1/2" [severity]="numberOfPendingNotes() === 0 ? 'success' : 'warn'">
        <span class="gap-2 text-xs sm:text-sm md:text-md justify-center flex flex-col md:flex-row">
          Pendentes:
          @if (numberOfPendingNotes() === 0) {
            <p class="font-extrabold">
              Nenhuma
              @if (!isSelectedMonthClosed()) {
                <span>(Pronto para fechamento)</span>
              }
            </p>
          } @else {
            <p class="font-extrabold">{{ numberOfPendingNotes() }}</p>
          }
        </span>
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
