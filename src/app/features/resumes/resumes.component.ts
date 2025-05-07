import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationsComponent } from './components/notifications.component';
import { CultsComponent } from './components/cults/cults.component';
import { ContributionComponent } from './components/contribution.component';

@Component({
  selector: 'app-resumes',
  imports: [CultsComponent, ContributionComponent, NotificationsComponent],
  template: `
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 md:col-span-6">
        <app-cults />
        <app-contribution />
      </div>
      <div class="col-span-12 xl:col-span-6">
        <app-notifications />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumesComponent {}
