import { Component } from '@angular/core';
import { Contribution } from '../../components/panel/contribution';
import { Notifications } from '../../components/panel/notifications';

@Component({
  selector: 'app-resumes',
  imports: [Contribution, Notifications],
  template: `
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 md:col-span-6">
        <app-contribution />
      </div>
      <div class="col-span-12 md:col-span-6">
        <app-notifications />
      </div>
    </div>
  `,
})
export class Resumes { }
