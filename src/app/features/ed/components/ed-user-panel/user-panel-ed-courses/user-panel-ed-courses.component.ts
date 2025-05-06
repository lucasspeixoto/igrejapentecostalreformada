import { PopoverModule } from 'primeng/popover';
import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataView } from 'primeng/dataview';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { EdCoursesService } from './../../../services/ed-courses/ed-courses.service';
import { CourseDatePipe } from '../../../pipes/course-date.pipe';
import { UserPanelEdCoursesSkeletonComponent } from '../user-panel-ed-courses-skeleton/user-panel-ed-courses-skeleton.component';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { environment } from 'src/environments/environment';

const PRIMENG = [
  PopoverModule,
  DividerModule,
  AvatarModule,
  AvatarGroupModule,
  DataView,
  ButtonModule,
];

const COMMON = [CommonModule, NgFor];

const PIPES = [CourseDatePipe];

const COMPONENTS = [UserPanelEdCoursesSkeletonComponent];

@Component({
  selector: 'app-user-panel-ed-courses',
  imports: [...PRIMENG, ...COMMON, ...PIPES, ...COMPONENTS],
  templateUrl: './user-panel-ed-courses.component.html',
  styleUrl: './user-panel-ed-courses.component.scss',
})
export class UserPanelEdCoursesComponent {
  public edCoursesService = inject(EdCoursesService);

  public loadingService = inject(LoadingService);

  public courses = this.edCoursesService.courses;

  public avatarsUrl = `${environment.SUPABASE_URL}/storage/v1/object/public/avatars/`;
}
