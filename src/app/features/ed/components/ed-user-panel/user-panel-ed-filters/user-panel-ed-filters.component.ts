import { Component, inject } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { EdCoursesService } from './../../../services/ed-courses/ed-courses.service';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

const PRIMENG = [ButtonModule, AccordionModule, CheckboxModule, DividerModule];

const COMMON = [FormsModule];

@Component({
  selector: 'app-user-panel-ed-filters',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './user-panel-ed-filters.component.html',
  styleUrl: './user-panel-ed-filters.component.scss',
})
export class UserPanelEdFiltersComponent {
  public edCoursesService = inject(EdCoursesService);

  public types: string[] = [];

  public professors: string[] = [];

  public themes: string[] = [];

  public applyFilters(): void {}

  public clearFilters(): void {}
}
