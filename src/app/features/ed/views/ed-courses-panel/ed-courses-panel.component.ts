import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DataViewModule } from 'primeng/dataview';
import { ORDER_TYPES } from '../../constants/course-order-types';
import { UserPanelEdCoursesComponent } from '../../components/ed-courses-panel/user-panel-ed-courses/user-panel-ed-courses.component';
import { EdLessonsService } from '../../services/ed-lessons/ed-lessons.service';
import { EdCoursesService } from '../../services/ed-courses/ed-courses.service';
import { SelectItem } from '../../../../models/select-item.model';
import { UserPanelEdFiltersComponent } from '../../components/ed-courses-panel/user-panel-ed-filters/user-panel-ed-filters.component';

const INITIAL_SELECTED_ORDER_TYPE: SelectItem = {
  name: 'Mais recente',
  code: 'newest',
};

const PRIMENG = [DataViewModule, SelectModule, InputTextModule, InputIconModule, IconFieldModule];

const COMMON = [FormsModule];

const COMPONENTS = [UserPanelEdCoursesComponent, UserPanelEdFiltersComponent];

@Component({
  selector: 'app-ed-courses-panel',
  imports: [...PRIMENG, ...COMMON, ...COMPONENTS],
  templateUrl: './ed-courses-panel.component.html',
})
export class EdCoursesPanelComponent implements OnInit {
  public edCoursesService = inject(EdCoursesService);
  public edLessonsService = inject(EdLessonsService);

  public selectedOrderType = model<SelectItem>(INITIAL_SELECTED_ORDER_TYPE);

  public orderTypes = ORDER_TYPES;

  public changeOrderTypeHandler(event: { name: string; code: string }): void {
    this.selectedOrderType.set(event);

    if (event.code === 'newest') {
      this.edCoursesService.getAllCoursesDataHandler();
    } else {
      this.edCoursesService.updateCurrentCoursesListByName(event.code as 'asc' | 'desc');
    }
  }

  public ngOnInit(): void {
    this.edCoursesService.getAllCoursesDataHandler();
  }
}
