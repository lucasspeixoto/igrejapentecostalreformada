import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TopFinanceNoteByCategory } from '../../models/finance-note.model';
import { COLOR_CLASS_MAP } from '../../../../utils/constants';

@Component({
  selector: 'app-category-note-detail',
  imports: [NgClass],
  template: `
    <li class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
      <div>
        <p class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">
          <span class="font-bold">{{ topFinanceNoteByCategory.name }}:</span>
          {{ topFinanceNoteByCategory.quantity }} nota(s)
        </p>
        <div class="mt-1 text-muted-color">R$ {{ topFinanceNoteByCategory.total.toFixed(2) }}</div>
      </div>
      <div class="mt-2 md:mt-0 flex items-center">
        <div
          class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
          style="height: 8px">
          <div
            [ngClass]="colorClassMap[itemColor]"
            class="h-full text-start"
            [style.width.%]="topFinanceNoteByCategory.percent"></div>
        </div>
        <span class="text-primary ml-4 font-bold"
          >%{{ topFinanceNoteByCategory.percent.toFixed(2) }}</span
        >
      </div>
    </li>
  `,
  styles: ``,
})
export class CategoryNoteDetailComponent {
  @Input() public topFinanceNoteByCategory!: TopFinanceNoteByCategory;

  @Input() public itemColor!: string;

  public colorClassMap = COLOR_CLASS_MAP;
}
