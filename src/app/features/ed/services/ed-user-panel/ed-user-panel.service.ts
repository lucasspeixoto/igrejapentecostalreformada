import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EdUserPanelService {
  public selectedTypeFilters = signal<string[]>([]);
}
