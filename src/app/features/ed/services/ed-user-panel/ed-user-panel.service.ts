import { EdCoursesService } from './../ed-courses/ed-courses.service';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EdUserPanelService {
  public edCoursesService = inject(EdCoursesService);

  public selectedProfessorsFilters = signal<string[]>([]);

  public selectedThemesFilters = signal<string | null>(null);

  public filterEdCoursesHandler(): void {
    this.edCoursesService.updateCurrentCoursesListByFilters(
      this.selectedProfessorsFilters(),
      this.selectedThemesFilters()
    );
  }

  public clearEdCoursesHandler(): void {
    this.selectedProfessorsFilters.set([]);

    this.selectedThemesFilters.set(null);

    this.edCoursesService.getAllCoursesDataHandler();
  }
}
