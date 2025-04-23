import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  public uploadedFileData = signal<string | null>(null);
}
