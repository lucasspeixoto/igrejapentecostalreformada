import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-user-panel-ed-courses-skeleton',
  imports: [Skeleton, DividerModule, NgFor],
  template: `
    <div class="grid grid-cols-12 gap-4 grid-nogutter">
      <div class="col-span-12" *ngFor="let n of [1, 2, 3, 4]">
        <div
          class="flex flex-col md:flex-row sm:items-start p-2 md:px-4 md:py-6 gap-4 border-t border-surface-200 dark:border-surface-700">
          <div class="md:w-40 relative">
            <p-skeleton class="w-full h-full rounded-border"></p-skeleton>
          </div>
          <div
            class="w-full flex flex-col md:flex-row justify-between items-start flex-1 gap-0 md:gap-6">
            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
              <div>
                <p-skeleton class="h-4 w-32 mb-4"></p-skeleton>

                <div class="flex items-center gap-2 mt-2">
                  <p-skeleton shape="circle" size="3rem"></p-skeleton>
                  <p-skeleton class="h-4 w-24"></p-skeleton>
                </div>
              </div>
            </div>
            <div class="block md:hidden w-full">
              <p-divider />
            </div>
            <div
              class="flex flex-row w-full md:w-auto justify-around md:flex-col md:justify-end gap-0 md:gap-2">
              <div class="flex items-center gap-2">
                <p-skeleton class="h-4 w-24"></p-skeleton>
              </div>
              <div class="flex items-center gap-2">
                <p-skeleton class="h-4 w-24"></p-skeleton>
              </div>
              <div class="flex items-center gap-2">
                <p-skeleton class="h-4 w-32"></p-skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UserPanelEdCoursesSkeletonComponent {}
