import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-user-panel-ed-courses-skeleton',
  imports: [Skeleton, DividerModule, NgFor],
  template: `
    <div class="grid grid-cols-12 gap-4">
      <div *ngFor="let n of [1, 2, 3, 4]" class="col-span-12 sm:col-span-6 xl:col-span-4 p-2">
        <div
          class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p-skeleton width="6rem" height="2rem" />
            <p-skeleton width="3rem" height="1rem" />
          </div>
          <div class="flex flex-col items-center gap-4 py-8">
            <p-skeleton height="10rem" class="w-3/4" styleClass="w-3/4" />
            <p-skeleton width="8rem" height="2rem" />
            <p-skeleton width="6rem" height="1rem" />
          </div>
          <div class="flex items-center justify-between">
            <p-skeleton width="4rem" height="2rem" />
            <p-skeleton width="6rem" height="1rem" shape="circle" size="3rem" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UserPanelEdCoursesSkeletonComponent {}
