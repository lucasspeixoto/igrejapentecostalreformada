import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ed',
  imports: [RouterModule],
  template: ` <section>
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12">
        <router-outlet />
      </div>
    </div>
  </section>`,
})
export class EdComponent {}
