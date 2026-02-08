import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notifications',
  imports: [ButtonModule],
  template: `<div class="card mb-8!">
    <div class="flex items-center justify-between mb-6">
      <div class="font-semibold text-xl">Notícias</div>
    </div>

    <span class="block text-muted-color font-medium mb-4">03/02/2026</span>
    <ul class="p-0 mx-0 mt-0 mb-6 list-none">
      <li class="flex items-center py-2 border-b border-surface">
        <div
          class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
          <i class="pi pi-warehouse text-xl! text-blue-500"></i>
        </div>
        <span class="text-surface-900 dark:text-surface-0 leading-normal"
          >Teremos
          <span class="text-surface-700 dark:text-surface-100">
            culto especial neste <span class="text-primary font-bold">domingo</span></span
          >, não percam.
        </span>
      </li>
    </ul>

    <span class="block text-muted-color font-medium mb-4">04/02/2026</span>
    <ul class="p-0 m-0 list-none">
      <li class="flex items-center py-2 border-b border-surface">
        <div
          class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0">
          <i class="pi pi-arrow-up text-xl! text-green-500"></i>
        </div>
        <span class="text-surface-900 dark:text-surface-0 leading-normal"
          >Último sermão liberado, assista e
          <span class="text-primary font-bold">compartilhe</span>.</span
        >
      </li>
    </ul>
  </div>`,
})
export class Notifications { }
