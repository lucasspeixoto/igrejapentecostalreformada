import { Component } from '@angular/core';
import { NotificationsWidgetComponent } from './components/notificationswidget';
import { StatsWidgetComponent } from './components/statswidget';
import { RecentSalesWidgetComponent } from './components/recentsaleswidget';
import { BestSellingWidgetComponent } from './components/bestsellingwidget';
import { RevenueStreamWidgetComponent } from './components/revenuestreamwidget';

@Component({
  selector: 'app-dashboard',
  imports: [
    StatsWidgetComponent,
    RecentSalesWidgetComponent,
    BestSellingWidgetComponent,
    RevenueStreamWidgetComponent,
    NotificationsWidgetComponent,
  ],
  template: `
    <div class="grid grid-cols-12 gap-8">
      <app-stats-widget class="contents" />
      <div class="col-span-12 xl:col-span-6">
        <app-recent-sales-widget />
        <app-best-selling-widget />
      </div>
      <div class="col-span-12 xl:col-span-6">
        <app-revenue-stream-widget />
        <app-notifications-widget />
      </div>
    </div>
  `,
})
export class DashboardComponent {}
